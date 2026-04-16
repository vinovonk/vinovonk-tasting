// Runtime Zod schema voor import-validatie van TastingSession JSON
// Valideert alleen structurele velden — tastingData blijft als unknown (te veel varianten)
import { z } from "zod";

const tastingNoteSchema = z.object({
	id: z.string().min(1),
	drankType: z.enum([
		"wijn",
		"spirit",
		"bier",
		"sake",
		"alcoholvrij",
		"anders",
		"champagne",
	]),
	tastingData: z.record(z.string(), z.unknown()),
	createdAt: z.string(),
	updatedAt: z.string(),
	fotoPath: z.string().optional(),
	audioPath: z.string().optional(),
	transcript: z.string().optional(),
	persoonlijkeNotitie: z.string().optional(),
	score: z.number().min(1).max(10).optional(),
});

export const tastingSessionSchema = z.object({
	id: z.string().min(1),
	naam: z.string().min(1),
	datum: z.string().min(1),
	beschrijving: z.string().optional(),
	flessen: z.array(tastingNoteSchema).default([]),
	createdAt: z.string(),
	updatedAt: z.string(),
	isArchived: z.boolean().optional(),
	biodynamischDagType: z.enum(["fruit", "bloem", "blad", "wortel"]).optional(),
});

export const importPayloadSchema = z.object({
	version: z.number().optional(),
	exportDate: z.string().optional(),
	sessions: z.array(z.unknown()),
});
