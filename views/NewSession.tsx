import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { createSession } from "../lib/storage";
import { navigate } from "../router";
import { Button } from "../ui/Button";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";

interface NewSessionProps {
	lang?: "nl" | "en";
}

const T = {
	nl: {
		title: "Nieuwe sessie",
		subtitle: "Geef de sessie een naam en sla optioneel context op.",
		back: "← Terug",
		section: "Sessie details",
		naam: "Naam van de sessie *",
		naamPlaceholder: "Bijv. Italiaanse wijnavond, Whisky club...",
		datum: "Datum",
		beschrijving: "Beschrijving (optioneel)",
		beschrijvingPlaceholder: "Context, aanleiding, gasten...",
		submit: "Sessie starten",
		submitting: "Aanmaken...",
	},
	en: {
		title: "New session",
		subtitle: "Give the session a name and optionally add some context.",
		back: "← Back",
		section: "Session details",
		naam: "Session name *",
		naamPlaceholder: "E.g. Italian wine evening, Whisky club...",
		datum: "Date",
		beschrijving: "Description (optional)",
		beschrijvingPlaceholder: "Context, occasion, guests...",
		submit: "Start session",
		submitting: "Creating...",
	},
};

export function NewSession({ lang = "nl" }: NewSessionProps) {
	const t = T[lang];
	const [naam, setNaam] = useState("");
	const [datum, setDatum] = useState(new Date().toISOString().split("T")[0]);
	const [beschrijving, setBeschrijving] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!naam.trim()) return;
		setLoading(true);
		const session = createSession(
			naam.trim(),
			datum,
			beschrijving.trim() || undefined,
		);
		navigate(`/sessie/${session.id}`);
	};

	return (
		<div
			style={{
				maxWidth: "600px",
				margin: "0 auto",
				padding: "2rem var(--gap)",
			}}
		>
			<button
				onClick={() => navigate("/")}
				style={{
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
				}}
			>
				{t.back}
			</button>

			<div style={{ marginBottom: "1.5rem" }}>
				<h1
					style={{
						fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
						margin: "0 0 0.5rem",
					}}
				>
					{t.title}
				</h1>
				<p
					style={{
						fontFamily: "var(--font-body)",
						color: "var(--color-gray)",
						margin: 0,
					}}
				>
					{t.subtitle}
				</p>
			</div>

			<form onSubmit={handleSubmit}>
				<Card>
					<CardHeader>
						<span
							style={{
								fontFamily: "var(--font-body)",
								fontWeight: 700,
								fontSize: "0.68rem",
								letterSpacing: "0.18em",
								textTransform: "uppercase",
								color: "var(--color-gray)",
								paddingLeft: "0.75rem",
								borderLeft: "8px solid var(--color-primary)",
							}}
						>
							{t.section}
						</span>
					</CardHeader>
					<CardContent>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "1.25rem",
							}}
						>
							<Input
								id="naam"
								label={t.naam}
								placeholder={t.naamPlaceholder}
								value={naam}
								onChange={(e) => setNaam(e.target.value)}
								maxLength={200}
								autoFocus
								required
							/>

							<Input
								id="datum"
								label={t.datum}
								type="date"
								value={datum}
								onChange={(e) => setDatum(e.target.value)}
							/>

							<Textarea
								id="beschrijving"
								label={t.beschrijving}
								placeholder={t.beschrijvingPlaceholder}
								value={beschrijving}
								onChange={(e) => setBeschrijving(e.target.value)}
								maxLength={2000}
								rows={3}
							/>

							<Button
								type="submit"
								variant="primary"
								size="lg"
								disabled={!naam.trim() || loading}
								style={{ width: "100%", justifyContent: "center" }}
							>
								{loading ? t.submitting : t.submit}
								<ArrowRight size={16} />
							</Button>
						</div>
					</CardContent>
				</Card>
			</form>
		</div>
	);
}
