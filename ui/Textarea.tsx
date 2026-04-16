import { forwardRef, type TextareaHTMLAttributes, useState } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ label, error, id, style, onFocus, onBlur, ...props }, ref) => {
		const [focused, setFocused] = useState(false);

		return (
			<div
				style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}
			>
				{label && (
					<label
						htmlFor={id}
						style={{
							fontFamily: "var(--font-body)",
							fontWeight: 700,
							fontSize: "0.68rem",
							letterSpacing: "0.12em",
							textTransform: "uppercase",
							color: "var(--color-on-surface)",
						}}
					>
						{label}
					</label>
				)}
				<textarea
					ref={ref}
					id={id}
					style={{
						width: "100%",
						padding: "0.65rem 0.875rem",
						fontFamily: "var(--font-body)",
						fontSize: "0.95rem",
						color: "var(--color-on-surface)",
						background: "var(--color-white)",
						border: `4px solid ${focused ? "var(--color-primary)" : error ? "#b91c1c" : "var(--color-border)"}`,
						borderRadius: 0,
						outline: "none",
						resize: "vertical",
						minHeight: "100px",
						transition: "border-color 150ms ease",
						...style,
					}}
					onFocus={(e) => {
						setFocused(true);
						onFocus?.(e);
					}}
					onBlur={(e) => {
						setFocused(false);
						onBlur?.(e);
					}}
					{...props}
				/>
				{error && (
					<span
						style={{
							fontFamily: "var(--font-body)",
							fontSize: "0.72rem",
							color: "#b91c1c",
						}}
					>
						{error}
					</span>
				)}
			</div>
		);
	},
);
Textarea.displayName = "Textarea";
