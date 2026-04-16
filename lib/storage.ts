// Client-side localStorage opslag voor proefsessies

import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import type { SessionSummary, TastingNote, TastingSession } from "../types";
import { getBiodynamischDagType } from "./biodynamisch";
import { importPayloadSchema, tastingSessionSchema } from "./schema";

const INDEX_KEY = "vinovonk_sessions_index";
const SESSION_PREFIX = "vinovonk_session_";

function getIndex(): SessionSummary[] {
	if (typeof window === "undefined") return [];
	try {
		return JSON.parse(localStorage.getItem(INDEX_KEY) || "[]");
	} catch {
		return [];
	}
}

function safeSetItem(key: string, value: string): boolean {
	try {
		localStorage.setItem(key, value);
		return true;
	} catch (e) {
		if (e instanceof DOMException && e.name === "QuotaExceededError") {
			toast.error(
				"Opslag vol — verwijder oude sessies of foto's, of exporteer een backup en wis je data.",
				{
					duration: 8000,
				},
			);
		}
		console.error("localStorage schrijffout:", e);
		return false;
	}
}

function setIndex(index: SessionSummary[]) {
	safeSetItem(INDEX_KEY, JSON.stringify(index));
}

function sessionKey(id: string) {
	return `${SESSION_PREFIX}${id}`;
}

export function getSessions(): SessionSummary[] {
	return getIndex().sort(
		(a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime(),
	);
}

export function getSession(id: string): TastingSession | null {
	if (typeof window === "undefined") return null;
	try {
		const data = localStorage.getItem(sessionKey(id));
		return data ? JSON.parse(data) : null;
	} catch {
		return null;
	}
}

export function createSession(
	naam: string,
	datum?: string,
	beschrijving?: string,
): TastingSession {
	const id = uuidv4();
	const now = new Date().toISOString();
	const sessionDatum = datum ?? new Date().toISOString().split("T")[0];

	const session: TastingSession = {
		id,
		naam,
		datum: sessionDatum,
		beschrijving,
		flessen: [],
		createdAt: now,
		updatedAt: now,
		biodynamischDagType: getBiodynamischDagType(new Date(sessionDatum)),
	};

	safeSetItem(sessionKey(id), JSON.stringify(session));
	const index = getIndex();
	index.push({
		id,
		naam,
		datum: sessionDatum,
		aantalFlessen: 0,
		createdAt: now,
	});
	setIndex(index);

	return session;
}

export function updateSession(
	id: string,
	updates: Partial<TastingSession>,
): TastingSession | null {
	const session = getSession(id);
	if (!session) return null;

	const updated: TastingSession = {
		...session,
		...updates,
		id: session.id,
		updatedAt: new Date().toISOString(),
	};

	safeSetItem(sessionKey(id), JSON.stringify(updated));

	const index = getIndex();
	const idx = index.findIndex((s) => s.id === id);
	if (idx !== -1) {
		index[idx] = {
			...index[idx],
			naam: updated.naam,
			datum: updated.datum,
			aantalFlessen: updated.flessen.length,
		};
		setIndex(index);
	}

	return updated;
}

export function deleteSession(id: string): boolean {
	try {
		localStorage.removeItem(sessionKey(id));
		const index = getIndex();
		setIndex(index.filter((s) => s.id !== id));
		return true;
	} catch {
		return false;
	}
}

export function addFles(
	sessionId: string,
	fles: TastingNote,
): TastingSession | null {
	const session = getSession(sessionId);
	if (!session) return null;
	session.flessen.push(fles);
	return updateSession(sessionId, { flessen: session.flessen });
}

export function updateFles(
	sessionId: string,
	flesId: string,
	updates: Partial<TastingNote>,
): TastingSession | null {
	const session = getSession(sessionId);
	if (!session) return null;

	const idx = session.flessen.findIndex((f) => f.id === flesId);
	if (idx === -1) return null;

	session.flessen[idx] = {
		...session.flessen[idx],
		...updates,
		id: flesId,
		updatedAt: new Date().toISOString(),
	};

	return updateSession(sessionId, { flessen: session.flessen });
}

export function deleteFles(
	sessionId: string,
	flesId: string,
): TastingSession | null {
	const session = getSession(sessionId);
	if (!session) return null;
	session.flessen = session.flessen.filter((f) => f.id !== flesId);
	return updateSession(sessionId, { flessen: session.flessen });
}

export function compressImage(
	file: File,
	maxWidth = 900,
	quality = 0.75,
): Promise<string> {
	return new Promise((resolve, reject) => {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		const img = new Image();
		const objectUrl = URL.createObjectURL(file);

		img.onload = () => {
			URL.revokeObjectURL(objectUrl);
			const scale = Math.min(1, maxWidth / img.width);
			canvas.width = Math.round(img.width * scale);
			canvas.height = Math.round(img.height * scale);
			ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
			resolve(canvas.toDataURL("image/jpeg", quality));
		};

		img.onerror = () => {
			URL.revokeObjectURL(objectUrl);
			reject(new Error("Afbeelding laden mislukt"));
		};

		img.src = objectUrl;
	});
}

// Export/import alle data als JSON
export function exportAllData(): string {
	const index = getIndex();
	const sessions = index.map((s) => getSession(s.id)).filter(Boolean);
	return JSON.stringify(
		{ version: 1, exportDate: new Date().toISOString(), sessions },
		null,
		2,
	);
}

export function importData(json: string): {
	imported: number;
	errors: string[];
} {
	const errors: string[] = [];
	let imported = 0;

	try {
		const raw = JSON.parse(json);

		// Haal sessies op uit payload (ondersteunt zowel {sessions:[]} als directe array)
		const payloadResult = importPayloadSchema.safeParse(raw);
		const rawSessions: unknown[] = payloadResult.success
			? payloadResult.data.sessions
			: Array.isArray(raw)
				? raw
				: [];

		for (const rawSession of rawSessions) {
			const result = tastingSessionSchema.safeParse(rawSession);
			if (!result.success) {
				const firstError = result.error.issues[0];
				errors.push(
					`Sessie overgeslagen: ${firstError?.path.join(".") ?? "onbekend"} — ${firstError?.message ?? "validatiefout"}`,
				);
				continue;
			}
			const session = result.data as unknown as TastingSession;
			safeSetItem(sessionKey(session.id), JSON.stringify(session));
			const index = getIndex();
			if (!index.find((s) => s.id === session.id)) {
				index.push({
					id: session.id,
					naam: session.naam,
					datum: session.datum,
					aantalFlessen: session.flessen?.length ?? 0,
					createdAt: session.createdAt,
				});
				setIndex(index);
			}
			imported++;
		}
	} catch (e) {
		errors.push(`Parse fout: ${e instanceof Error ? e.message : String(e)}`);
	}

	return { imported, errors };
}

export function clearAllData(): void {
	const index = getIndex();
	index.forEach((s) => localStorage.removeItem(sessionKey(s.id)));
	localStorage.removeItem(INDEX_KEY);
}
