import {
	Box,
	Button,
	Card,
	CardContent,
	FormControl,
	Input,
	TextField
} from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import QRCode from "qrcode";

import "./qr-code-form.css";

export function QRCodeForm({ QRType }: { QRType: string }) {
	const [url, setURL] = useState("www.example.com");
	const [email, setEmail] = useState("example@example.com");
	const canvasRef = useRef(null);

	// For the initially rendering the canvas with a www.example.com URL.
	useEffect(() => {
		QRCode.toCanvas(canvasRef.current, "www.example.com", QRCodeErrorHandler);
	}, []);

	function QRCodeErrorHandler(error: Error | null | undefined) {
		if (error) alert(error);
	}

	function onURLChange(event: ChangeEvent<HTMLInputElement>) {
		setURL(event.target.value);
		if (!event.target.value) return;

		QRCode.toCanvas(canvasRef.current, event.target.value, QRCodeErrorHandler);
	}

	function onEmailChange(event: ChangeEvent<HTMLInputElement>) {
		setEmail(event.target.value);
		if (!event.target.value) return;

		QRCode.toCanvas(
			canvasRef.current,
			"mailto:" + event.target.value,
			QRCodeErrorHandler
		);
	}

	function onImageChange(event: ChangeEvent<HTMLInputElement>) {
		const input = event.target as HTMLInputElement;
		if (!input.files?.length) return;

		const file = input.files[0];
		file.arrayBuffer().then((arrayBuffer) => {
			const arr = new Uint8ClampedArray(arrayBuffer);
			QRCode.toCanvas(canvasRef.current, [{ data: arr, mode: "byte" }], {
				errorCorrectionLevel: "L"
			});
		});
	}

	function downloadImage(MIMEType = "image/png", filename = "qr.png") {
		const anchor = document.createElement("a");
		const canvas = canvasRef.current as unknown as HTMLCanvasElement;
		canvas.toBlob(
			(blob) => {
				if (!blob) {
					alert("Too much data or image format unsupported.");
					return;
				}

				const blobURL = URL.createObjectURL(blob);
				anchor.download = filename;
				anchor.href = blobURL;
				anchor.click();
				URL.revokeObjectURL(blobURL);
			},
			MIMEType,
			1
		);
	}

	return (
		<Box id="qr-code-form">
			{/* Input fields for data input. */}
			<Box display={QRType === "url" ? "block" : "none"} component="form">
				<FormControl>
					<TextField
						value={url}
						onChange={onURLChange}
						label="URL"
						variant="outlined"
						required
						type="url"
					/>
				</FormControl>
			</Box>
			<Box display={QRType === "email" ? "block" : "none"} component="form">
				<FormControl>
					<TextField
						value={email}
						onChange={onEmailChange}
						label="Email"
						variant="outlined"
						required
						type="email"
					/>
				</FormControl>
			</Box>
			<Box display={QRType === "image" ? "block" : "none"} component="form">
				<FormControl>
					<Card>
						<CardContent>
							This directly creates a QR Code that embeds the image at low
							compression mode. You can print this QR and use any popular QR
							decoder such as
							<a href="https://www.zxing.org"> ZXing </a>
							to decode it to your original image. It has a limit of 2953
							bytes (around 2 KB).
							<Button>
								<input
									type="file"
									accept="image/*"
									onChange={onImageChange}
								></input>
							</Button>
						</CardContent>
					</Card>
				</FormControl>
			</Box>

			{/* Actual canvas to display the generated QR code. */}
			<canvas
				ref={canvasRef}
				style={{ width: "300px", height: "300px" }}
			></canvas>

			{/* Download buttons. */}
			<Box id="qr-code-download-buttons">
				<Button
					onClick={() => downloadImage("image/png", "qr.png")}
					variant="contained"
				>
					Download as PNG
				</Button>
				<Button
					onClick={() => downloadImage("image/jpeg", "qr.jpeg")}
					variant="contained"
				>
					Download as JPEG
				</Button>
			</Box>
		</Box>
	);
}
