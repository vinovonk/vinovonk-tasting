import { Camera, ImagePlus, RotateCcw, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface FotoCaptureProps {
	fotoUrl?: string;
	onFotoChange: (file: File | null, previewUrl: string | null) => void;
	lang?: "nl" | "en";
}

const MAX_FILE_SIZE = 15 * 1024 * 1024;
const ALLOWED_TYPES = [
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/heic",
	"image/heif",
];

export function FotoCapture({
	fotoUrl,
	onFotoChange,
	lang = "nl",
}: FotoCaptureProps) {
	const isEN = lang === "en";
	const [preview, setPreview] = useState<string | null>(fotoUrl || null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const cameraInputRef = useRef<HTMLInputElement>(null);

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (file.size > MAX_FILE_SIZE) {
			toast.error(
				isEN ? "Image too large (max 15MB)" : "Afbeelding te groot (max 15MB)",
			);
			e.target.value = "";
			return;
		}

		if (file.type && !ALLOWED_TYPES.includes(file.type)) {
			toast.error(
				isEN
					? "Invalid file type — use JPEG, PNG or WebP"
					: "Ongeldig bestandstype — gebruik JPEG, PNG of WebP",
			);
			e.target.value = "";
			return;
		}

		const url = URL.createObjectURL(file);
		setPreview(url);
		onFotoChange(file, url);
	};

	const handleRemove = () => {
		setPreview(null);
		onFotoChange(null, null);
		if (fileInputRef.current) fileInputRef.current.value = "";
		if (cameraInputRef.current) cameraInputRef.current.value = "";
	};

	const btnBase = {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: "0.5rem",
		border: "4px solid var(--color-border)",
		background: "var(--color-white)",
		color: "var(--color-on-surface)",
		cursor: "pointer",
		fontFamily: "var(--font-body)",
		fontWeight: 700,
		fontSize: "0.72rem",
		letterSpacing: "0.1em",
		textTransform: "uppercase" as const,
		padding: "1.25rem",
		flexDirection: "column" as const,
	};

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
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
				{isEN ? "Bottle photo" : "Foto van de fles"}
			</span>

			{preview ? (
				<div
					style={{
						position: "relative",
						border: "4px solid var(--color-border)",
						background: "var(--color-surface-high)",
					}}
				>
					<img
						src={preview}
						alt={isEN ? "Bottle photo" : "Flesfoto"}
						style={{
							width: "100%",
							maxHeight: "260px",
							objectFit: "contain",
							display: "block",
						}}
					/>
					<div
						style={{
							position: "absolute",
							top: "0.5rem",
							right: "0.5rem",
							display: "flex",
							gap: "0.25rem",
						}}
					>
						<button
							type="button"
							onClick={() => cameraInputRef.current?.click()}
							style={{
								background: "rgba(255,248,240,0.85)",
								border: "2px solid var(--color-border)",
								cursor: "pointer",
								padding: "0.35rem",
								display: "flex",
								alignItems: "center",
							}}
							title={isEN ? "Retake photo" : "Opnieuw fotograferen"}
						>
							<RotateCcw size={14} />
						</button>
						<button
							type="button"
							onClick={handleRemove}
							style={{
								background: "rgba(255,248,240,0.85)",
								border: "2px solid var(--color-border)",
								cursor: "pointer",
								padding: "0.35rem",
								display: "flex",
								alignItems: "center",
							}}
							title={isEN ? "Remove photo" : "Foto verwijderen"}
						>
							<X size={14} />
						</button>
					</div>
				</div>
			) : (
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "2px",
					}}
				>
					<button
						type="button"
						style={btnBase}
						onClick={() => cameraInputRef.current?.click()}
					>
						<Camera size={22} />
						{isEN ? "Take photo" : "Foto maken"}
					</button>
					<button
						type="button"
						style={btnBase}
						onClick={() => fileInputRef.current?.click()}
					>
						<ImagePlus size={22} />
						{isEN ? "From library" : "Uit bibliotheek"}
					</button>
				</div>
			)}

			<input
				ref={cameraInputRef}
				type="file"
				accept="image/*"
				capture="environment"
				onChange={handleFileSelect}
				style={{ display: "none" }}
			/>
			<input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				onChange={handleFileSelect}
				style={{ display: "none" }}
			/>
		</div>
	);
}
