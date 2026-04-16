"use client";

// Sheet = Dialog als side-panel (rechts inschuiven)
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

export function SheetContent({
	children,
	side = "right",
	showClose = true,
	style,
	...props
}: ComponentProps<typeof DialogPrimitive.Content> & {
	side?: "left" | "right" | "bottom";
	showClose?: boolean;
}) {
	const sideStyles: React.CSSProperties =
		side === "right"
			? {
					top: 0,
					right: 0,
					bottom: 0,
					width: "min(85vw, 480px)",
					borderLeft: "4px solid var(--color-border)",
					borderRight: "none",
				}
			: side === "left"
				? {
						top: 0,
						left: 0,
						bottom: 0,
						width: "min(85vw, 480px)",
						borderRight: "4px solid var(--color-border)",
						borderLeft: "none",
					}
				: {
						left: 0,
						right: 0,
						bottom: 0,
						maxHeight: "85vh",
						borderTop: "4px solid var(--color-border)",
						borderBottom: "none",
					};

	return (
		<DialogPrimitive.Portal>
			<DialogPrimitive.Overlay
				style={{
					position: "fixed",
					inset: 0,
					background: "rgba(0,0,0,0.5)",
					zIndex: 200,
				}}
			/>
			<DialogPrimitive.Content
				style={{
					position: "fixed",
					zIndex: 201,
					background: "var(--color-background)",
					border: "4px solid var(--color-border)",
					boxShadow:
						side === "right"
							? "-8px 0 0 #000"
							: side === "left"
								? "8px 0 0 #000"
								: "0 -8px 0 #000",
					overflowY: "auto",
					padding: "1.5rem",
					...sideStyles,
					...style,
				}}
				{...props}
			>
				{showClose && (
					<DialogPrimitive.Close
						style={{
							position: "absolute",
							top: "1rem",
							right: "1rem",
							background: "none",
							border: "2px solid var(--color-border)",
							cursor: "pointer",
							padding: "0.25rem",
							display: "flex",
							alignItems: "center",
							color: "var(--color-on-surface)",
						}}
						aria-label="Sluiten"
					>
						<X size={16} />
					</DialogPrimitive.Close>
				)}
				{children}
			</DialogPrimitive.Content>
		</DialogPrimitive.Portal>
	);
}

export function SheetHeader({
	children,
	style,
	...props
}: {
	children: ReactNode;
	style?: React.CSSProperties;
}) {
	return (
		<div
			style={{
				marginBottom: "1.25rem",
				paddingBottom: "1rem",
				borderBottom: "4px solid var(--color-border)",
				paddingRight: "2.5rem",
				...style,
			}}
			{...props}
		>
			{children}
		</div>
	);
}

export function SheetTitle({
	children,
	style,
	...props
}: ComponentProps<typeof DialogPrimitive.Title>) {
	return (
		<DialogPrimitive.Title
			style={{
				fontFamily: "var(--font-headline)",
				fontWeight: 900,
				fontSize: "1.1rem",
				textTransform: "uppercase",
				letterSpacing: "-0.02em",
				margin: 0,
				...style,
			}}
			{...props}
		>
			{children}
		</DialogPrimitive.Title>
	);
}
