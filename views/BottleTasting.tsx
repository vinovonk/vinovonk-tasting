import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { FotoCapture } from "../features/FotoCapture";
import type { AlcoholVrijFormHandle } from "../forms/AlcoholVrijForm";
import { AlcoholVrijForm } from "../forms/AlcoholVrijForm";
import type { ChampagneFormHandle } from "../forms/ChampagneForm";
import { ChampagneForm } from "../forms/ChampagneForm";
import type { GenericFormHandle } from "../forms/GenericForm";
import { GenericForm } from "../forms/GenericForm";
import type { SpiritsFormHandle } from "../forms/SpiritsForm";
import { SpiritsForm } from "../forms/SpiritsForm";
import type { WijnFormHandle } from "../forms/WijnForm";
import { WijnForm } from "../forms/WijnForm";
import { compressImage, getSession, updateFles } from "../lib/storage";
import { navigate } from "../router";
import type {
	AlcoholVrijTasting,
	AnderDrankType,
	ChampagneTasting,
	DrankType,
	GenericTasting,
	SpiritsProef,
	TastingData,
	TastingNote,
	WijnProef,
} from "../types";
import {
	createEmptyAlcoholVrijTasting,
	createEmptyChampagneTasting,
	createEmptyGenericTasting,
	createEmptySpiritsTasting,
	createEmptyWineTasting,
} from "../types";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";

interface BottleTastingProps {
	sessionId: string;
	flesId: string;
	lang?: "nl" | "en";
}

const T = {
	nl: {
		back: "Terug",
		drankTypeLabel: "Type drank",
		info: "Info",
		proeven: "Proeven",
		volgende: "Volgende: Proeven →",
		terugInfo: "← Info",
		opslaan: "Proefnotitie opgeslagen",
		fotoFout: "Foto comprimeren mislukt",
		typeWijzigen: "Type wijzigen wist ingevulde data. Doorgaan?",
		nieGevonden: "Fles niet gevonden",
	},
	en: {
		back: "Back",
		drankTypeLabel: "Drink type",
		info: "Info",
		proeven: "Tasting",
		volgende: "Next: Tasting →",
		terugInfo: "← Info",
		opslaan: "Tasting note saved",
		fotoFout: "Photo compression failed",
		typeWijzigen: "Changing type will clear entered data. Continue?",
		nieGevonden: "Bottle not found",
	},
};

const DRANK_OPTIES: { waarde: DrankType; nl: string; en: string }[] = [
	{ waarde: "wijn", nl: "Wijn", en: "Wine" },
	{ waarde: "champagne", nl: "Champagne", en: "Champagne" },
	{ waarde: "spirit", nl: "Spirits", en: "Spirits" },
	{ waarde: "bier", nl: "Bier", en: "Beer" },
	{ waarde: "sake", nl: "Sake", en: "Sake" },
	{ waarde: "alcoholvrij", nl: "Alcoholvrij", en: "Non-alcoholic" },
	{ waarde: "anders", nl: "Anders", en: "Other" },
];

const isTweeFase = (t: DrankType) => t === "wijn" || t === "champagne";

const backBtnStyle: React.CSSProperties = {
	background: "none",
	border: "none",
	cursor: "pointer",
	fontFamily: "var(--font-body)",
	fontSize: "0.72rem",
	fontWeight: 700,
	letterSpacing: "0.1em",
	textTransform: "uppercase",
	color: "var(--color-gray)",
	marginBottom: "1.5rem",
	padding: 0,
	display: "flex",
	alignItems: "center",
	gap: "0.25rem",
};

const pillStyle = (sel: boolean): React.CSSProperties => ({
	fontFamily: "var(--font-body)",
	fontSize: "0.72rem",
	fontWeight: 600,
	padding: "0.3rem 0.7rem",
	cursor: "pointer",
	background: sel ? "var(--color-primary)" : "var(--color-white)",
	color: sel ? "#fff" : "var(--color-on-surface)",
	border: `2px solid ${sel ? "var(--color-primary)" : "var(--color-border)"}`,
});

const stepStyle = (active: boolean): React.CSSProperties => ({
	flex: 1,
	padding: "0.5rem 0.75rem",
	textAlign: "center",
	fontFamily: "var(--font-body)",
	fontSize: "0.68rem",
	fontWeight: 700,
	letterSpacing: "0.1em",
	textTransform: "uppercase",
	background: active ? "var(--color-primary)" : "var(--color-surface)",
	color: active ? "#fff" : "var(--color-gray)",
	border: `4px solid ${active ? "var(--color-primary)" : "var(--color-border)"}`,
});

function hasMeaningfulData(fles: TastingNote | null): boolean {
	if (!fles) return false;
	const d = fles.tastingData as unknown as Record<string, unknown>;
	const name = (d.wijnNaam || d.cuveeNaam || d.naam || "") as string;
	return name.trim().length > 0;
}

export function BottleTasting({
	sessionId,
	flesId,
	lang = "nl",
}: BottleTastingProps) {
	const t = T[lang];

	// Load synchronously — localStorage is sync, safe to init in useState
	const [fles] = useState<TastingNote | null>(() => {
		const session = getSession(sessionId);
		return session?.flessen.find((f) => f.id === flesId) ?? null;
	});

	const [drankType, setDrankType] = useState<DrankType>(
		() => fles?.drankType ?? "wijn",
	);
	const [fase, setFase] = useState<"info" | "proeven">("info");
	const [fotoFile, setFotoFile] = useState<File | null>(null);
	const [saving, setSaving] = useState(false);

	// Refs for AI integration (Phase 5)
	const wijnRef = useRef<WijnFormHandle>(null);
	const champagneRef = useRef<ChampagneFormHandle>(null);
	const spiritsRef = useRef<SpiritsFormHandle>(null);
	const alcoholVrijRef = useRef<AlcoholVrijFormHandle>(null);
	const genericRef = useRef<GenericFormHandle>(null);

	// Compute initial data once — merge with empty to ensure full shape
	const initialWijnData = useMemo((): WijnProef => {
		if (fles?.drankType !== "wijn") return createEmptyWineTasting();
		return {
			...createEmptyWineTasting(),
			...(fles.tastingData as Partial<WijnProef>),
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const initialChampagneData = useMemo((): ChampagneTasting => {
		if (fles?.drankType !== "champagne") return createEmptyChampagneTasting();
		return {
			...createEmptyChampagneTasting(),
			...(fles.tastingData as Partial<ChampagneTasting>),
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const initialSpiritsData = useMemo((): SpiritsProef => {
		if (fles?.drankType !== "spirit") return createEmptySpiritsTasting();
		return {
			...createEmptySpiritsTasting(),
			...(fles.tastingData as Partial<SpiritsProef>),
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const initialAlcoholVrijData = useMemo((): AlcoholVrijTasting => {
		if (fles?.drankType !== "alcoholvrij")
			return createEmptyAlcoholVrijTasting();
		return {
			...createEmptyAlcoholVrijTasting(),
			...(fles.tastingData as Partial<AlcoholVrijTasting>),
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const initialGenericData = useMemo((): GenericTasting => {
		if (
			fles?.drankType !== "bier" &&
			fles?.drankType !== "sake" &&
			fles?.drankType !== "anders"
		)
			return createEmptyGenericTasting();
		return {
			...createEmptyGenericTasting(),
			...(fles.tastingData as Partial<GenericTasting>),
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleDrankTypeChange = (nieuw: DrankType) => {
		if (nieuw === drankType) return;
		if (hasMeaningfulData(fles) && !window.confirm(t.typeWijzigen)) return;
		setDrankType(nieuw);
		setFase("info");
		updateFles(sessionId, flesId, { drankType: nieuw });
	};

	const handleSave = async (
		data: TastingData,
		notitie?: string,
		score?: number,
	) => {
		setSaving(true);
		let fotoPath = fles?.fotoPath;
		if (fotoFile) {
			try {
				fotoPath = await compressImage(fotoFile);
			} catch {
				toast.error(t.fotoFout);
				setSaving(false);
				return;
			}
		}
		updateFles(sessionId, flesId, {
			drankType,
			tastingData: data,
			fotoPath,
			persoonlijkeNotitie: notitie,
			score,
		});
		toast.success(t.opslaan);
		navigate(`/sessie/${sessionId}`);
	};

	const handleFotoChange = (file: File | null) => {
		setFotoFile(file);
	};

	if (!fles) {
		return (
			<div
				style={{
					maxWidth: "800px",
					margin: "0 auto",
					padding: "2rem var(--gap)",
				}}
			>
				<button
					onClick={() => navigate(`/sessie/${sessionId}`)}
					style={backBtnStyle}
				>
					← {t.back}
				</button>
				<p
					style={{ fontFamily: "var(--font-body)", color: "var(--color-gray)" }}
				>
					{t.nieGevonden}
				</p>
			</div>
		);
	}

	const genericDrankType: AnderDrankType =
		drankType === "bier" ? "bier" : drankType === "sake" ? "sake" : "anders";

	return (
		<div
			style={{
				maxWidth: "800px",
				margin: "0 auto",
				padding: "2rem var(--gap)",
			}}
		>
			{/* Back */}
			<button
				onClick={() => navigate(`/sessie/${sessionId}`)}
				style={backBtnStyle}
			>
				← {t.back}
			</button>

			{/* DrankType selector */}
			<Card style={{ marginBottom: "1.5rem" }}>
				<CardContent style={{ paddingTop: "1.25rem" }}>
					<span
						style={{
							fontFamily: "var(--font-body)",
							fontWeight: 700,
							fontSize: "0.68rem",
							letterSpacing: "0.12em",
							textTransform: "uppercase",
							color: "var(--color-on-surface)",
							display: "block",
							marginBottom: "0.5rem",
						}}
					>
						{t.drankTypeLabel}
					</span>
					<div style={{ display: "flex", flexWrap: "wrap", gap: "2px" }}>
						{DRANK_OPTIES.map((opt) => (
							<button
								key={opt.waarde}
								type="button"
								style={pillStyle(opt.waarde === drankType)}
								onClick={() => handleDrankTypeChange(opt.waarde)}
							>
								{lang === "en" ? opt.en : opt.nl}
							</button>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Foto */}
			<Card style={{ marginBottom: "1.5rem" }}>
				<CardContent style={{ paddingTop: "1.25rem" }}>
					<FotoCapture
						fotoUrl={fles.fotoPath}
						onFotoChange={handleFotoChange}
						lang={lang}
					/>
				</CardContent>
			</Card>

			{/* Fase stepper for wijn / champagne */}
			{isTweeFase(drankType) && (
				<div style={{ display: "flex", gap: "2px", marginBottom: "1.5rem" }}>
					<div style={stepStyle(fase === "info")}>1. {t.info}</div>
					<div style={stepStyle(fase === "proeven")}>2. {t.proeven}</div>
				</div>
			)}

			{/* Back-to-info button when in proeven fase */}
			{isTweeFase(drankType) && fase === "proeven" && (
				<div style={{ marginBottom: "1rem" }}>
					<Button variant="outline" onClick={() => setFase("info")}>
						{t.terugInfo}
					</Button>
				</div>
			)}

			{/* === FORMS === */}

			{drankType === "wijn" && (
				<WijnForm
					ref={wijnRef}
					fase={fase}
					initialData={initialWijnData}
					persoonlijkeNotitie={fles.persoonlijkeNotitie}
					score={fles.score}
					onSave={handleSave}
					lang={lang}
				/>
			)}

			{drankType === "champagne" && (
				<ChampagneForm
					ref={champagneRef}
					fase={fase}
					initialData={initialChampagneData}
					persoonlijkeNotitie={fles.persoonlijkeNotitie}
					score={fles.score}
					onSave={handleSave}
					lang={lang}
				/>
			)}

			{drankType === "spirit" && (
				<SpiritsForm
					ref={spiritsRef}
					initialData={initialSpiritsData}
					persoonlijkeNotitie={fles.persoonlijkeNotitie}
					score={fles.score}
					onSave={handleSave}
					lang={lang}
				/>
			)}

			{drankType === "alcoholvrij" && (
				<AlcoholVrijForm
					ref={alcoholVrijRef}
					initialData={initialAlcoholVrijData}
					persoonlijkeNotitie={fles.persoonlijkeNotitie}
					score={fles.score}
					onSave={handleSave}
					lang={lang}
				/>
			)}

			{(drankType === "bier" ||
				drankType === "sake" ||
				drankType === "anders") && (
				<GenericForm
					ref={genericRef}
					drankType={genericDrankType}
					initialData={initialGenericData}
					persoonlijkeNotitie={fles.persoonlijkeNotitie}
					score={fles.score}
					onSave={handleSave}
					lang={lang}
				/>
			)}

			{/* Volgende button for info fase (wijn/champagne) */}
			{isTweeFase(drankType) && fase === "info" && (
				<div style={{ marginTop: "1.5rem" }}>
					<Button
						style={{ width: "100%" }}
						onClick={() => setFase("proeven")}
						disabled={saving}
					>
						{t.volgende}
					</Button>
				</div>
			)}
		</div>
	);
}
