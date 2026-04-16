"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({
	children,
	showClose = true,
	style,
	...props
}: ComponentProps<typeof DialogPrimitive.Content> & {
	showClose?: boolean;
}) {
	return (
		<DialogPrimitive.Portal>
			{/* Overlay */}
			<DialogPrimitive.Overlay
				style={{
					position: "fixed",
					inset: 0,
					background: "rgba(0,0,0,0.6)",
					zIndex: 200,
				}}
			/>
			{/* Content */}
			<DialogPrimitive.Content
				style={{
					position: "fixed",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					zIndex: 201,
					width: "min(90vw, 560px)",
					maxHeight: "85vh",
					overflowY: "auto",
					background: "var(--color-background)",
					border: "4px solid var(--color-border)",
					boxShadow: "8px 8px 0px 0px #000",
					padding: "1.5rem",
					...style,
				}}
				{...props}
			>
				{children}
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
							justifyContent: "center",
							color: "var(--color-on-surface)",
						}}
						aria-label="Sluiten"
					>
						<X size={16} />
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Content>
		</DialogPrimitive.Portal>
	);
}

export function DialogHeader({
	children,
	style,
	...props
}: {
	children: ReactNode;
	style?: React.CSSProperties;
	[key: string]: unknown;
}) {
	return (
		<div
			style={{
				marginBottom: "1.25rem",
				paddingBottom: "1rem",
				borderBottom: "4px solid var(--color-border)",
				...style,
			}}
			{...props}
		>
			{children}
		</div>
	);
}

export function DialogTitle({
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
				paddingRight: "2rem",
				...style,
			}}
			{...props}
		>
			{children}
		</DialogPrimitive.Title>
	);
}

export function DialogDescription({
	children,
	style,
	...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
	return (
		<DialogPrimitive.Description
			style={{
				fontFamily: "var(--font-body)",
				fontSize: "0.9rem",
				color: "var(--color-gray)",
				marginTop: "0.5rem",
				...style,
			}}
			{...props}
		>
			{children}
		</DialogPrimitive.Description>
	);
}

export function DialogFooter({
	children,
	style,
	...props
}: {
	children: ReactNode;
	style?: React.CSSProperties;
	[key: string]: unknown;
}) {
	return (
		<div
			style={{
				display: "flex",
				gap: "0.75rem",
				justifyContent: "flex-end",
				marginTop: "1.25rem",
				paddingTop: "1rem",
				borderTop: "4px solid var(--color-border)",
				...style,
			}}
			{...props}
		>
			{children}
		</div>
	);
}
