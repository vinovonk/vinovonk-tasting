import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
	type DruifInfo,
	getSuggesties,
	POPULAIRE_DRUIVEN,
} from "../data/druiven-database";
import type { WijnType } from "../types";

interface DruivenInputProps {
	druiven: string[];
	onChange: (druiven: string[]) => void;
	wijnType: WijnType;
	land?: string;
	regio?: string;
	lang?: "nl" | "en";
}

export function DruivenInput({
	druiven,
	onChange,
	wijnType,
	land,
	regio,
	lang = "nl",
}: DruivenInputProps) {
	const isEN = lang === "en";
	const [inputValue, setInputValue] = useState("");
	const [showSuggesties, setShowSuggesties] = useState(false);
	const [geselecteerdeIndex, setGeselecteerdeIndex] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);

	const suggesties = getSuggesties(wijnType, land, inputValue, regio);

	const voegDruifToe = (druif: string) => {
		const trimmed = druif.trim();
		if (trimmed && !druiven.includes(trimmed)) onChange([...druiven, trimmed]);
		setInputValue("");
		setShowSuggesties(false);
		setGeselecteerdeIndex(0);
	};

	const verwijderDruif = (index: number) =>
		onChange(druiven.filter((_, i) => i !== index));

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			if (showSuggesties && suggesties.length > 0)
				voegDruifToe(suggesties[geselecteerdeIndex].naam);
			else if (inputValue.trim()) voegDruifToe(inputValue);
		} else if (e.key === "Backspace" && !inputValue && druiven.length > 0) {
			verwijderDruif(druiven.length - 1);
		} else if (e.key === "ArrowDown" && showSuggesties) {
			e.preventDefault();
			setGeselecteerdeIndex((p) => (p < suggesties.length - 1 ? p + 1 : 0));
		} else if (e.key === "ArrowUp" && showSuggesties) {
			e.preventDefault();
			setGeselecteerdeIndex((p) => (p > 0 ? p - 1 : suggesties.length - 1));
		} else if (e.key === "Escape") {
			setShowSuggesties(false);
		}
	};

	useEffect(() => {
		setGeselecteerdeIndex(0);
	}, [inputValue]);

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
			<span
				style={{
					fontFamily: "var(--font-body)",
					fontWeight: 700,
					fontSize: "0.68rem",
					letterSpacing: "0.12em",
					textTransform: "uppercase",
					color: "var(--color-on-surface)",
				}}
			>
				{isEN ? "Grape varieties" : "Druivenrassen"}
			</span>

			{druiven.length > 0 && (
				<div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
					{druiven.map((druif, index) => (
						<span
							key={index}
							style={{
								display: "inline-flex",
								alignItems: "center",
								gap: "0.25rem",
								padding: "0.25rem 0.5rem",
								fontFamily: "var(--font-body)",
								fontSize: "0.72rem",
								fontWeight: 600,
								background: "var(--color-surface-high)",
								border: "2px solid var(--color-border)",
								color: "var(--color-on-surface)",
							}}
						>
							{druif}
							<button
								type="button"
								onClick={() => verwijderDruif(index)}
								style={{
									background: "none",
									border: "none",
									cursor: "pointer",
									padding: 0,
									display: "flex",
									alignItems: "center",
									color: "inherit",
								}}
							>
								<X size={11} />
							</button>
						</span>
					))}
				</div>
			)}

			<div style={{ position: "relative" }}>
				<input
					ref={inputRef}
					placeholder={
						druiven.length === 0
							? isEN
								? "Type to search or add a grape..."
								: "Typ om te zoeken of voeg druif toe..."
							: isEN
								? "Add another grape..."
								: "Voeg nog een druif toe..."
					}
					value={inputValue}
					onChange={(e) => {
						setInputValue(e.target.value);
						setShowSuggesties(true);
					}}
					onKeyDown={handleKeyDown}
					onFocus={() => setShowSuggesties(true)}
					onBlur={() => setTimeout(() => setShowSuggesties(false), 200)}
					role="combobox"
					aria-expanded={showSuggesties && suggesties.length > 0}
					aria-autocomplete="list"
					style={{
						width: "100%",
						padding: "0.65rem 0.875rem",
						fontFamily: "var(--font-body)",
						fontSize: "0.95rem",
						border: "4px solid var(--color-border)",
						background: "var(--color-white)",
						color: "var(--color-on-surface)",
						outline: "none",
						boxSizing: "border-box",
					}}
				/>

				{showSuggesties && suggesties.length > 0 && (
					<div
						role="listbox"
						style={{
							position: "absolute",
							zIndex: 50,
							width: "100%",
							marginTop: "2px",
							background: "var(--color-background)",
							border: "4px solid var(--color-border)",
							boxShadow: "var(--shadow-card)",
							maxHeight: "200px",
							overflowY: "auto",
						}}
					>
						{suggesties.slice(0, 10).map((druif, index) => (
							<button
								key={druif.naam}
								type="button"
								role="option"
								aria-selected={index === geselecteerdeIndex}
								onMouseDown={(e) => {
									e.preventDefault();
									voegDruifToe(druif.naam);
								}}
								style={{
									width: "100%",
									textAlign: "left",
									padding: "0.6rem 0.875rem",
									background:
										index === geselecteerdeIndex
											? "var(--color-surface)"
											: "transparent",
									border: "none",
									borderBottom: "1px solid var(--color-gray-light)",
									cursor: "pointer",
									fontFamily: "var(--font-body)",
								}}
							>
								<div style={{ fontSize: "0.9rem", fontWeight: 600 }}>
									{druif.naam}
								</div>
								{land && druif.landen.includes(land) && (
									<div
										style={{ fontSize: "0.72rem", color: "var(--color-gray)" }}
									>
										{isEN ? `Popular in ${land}` : `Populair in ${land}`}
									</div>
								)}
							</button>
						))}
					</div>
				)}
			</div>

			<p
				style={{
					fontFamily: "var(--font-body)",
					fontSize: "0.72rem",
					color: "var(--color-gray)",
				}}
			>
				{isEN
					? "Type to search, or enter a custom name and press Enter"
					: "Typ om te zoeken, of voer een eigen naam in en druk Enter"}
			</p>
		</div>
	);
}
