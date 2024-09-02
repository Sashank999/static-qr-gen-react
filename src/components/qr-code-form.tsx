import { Box, Button, FormControl, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import QRCode from "qrcode";

import "./qr-code-form.css";

export function QRCodeForm({ QRType }: { QRType: string }) {
	const [email, setEmail] = useState("example@example.com");
	const [url, setURL] = useState("www.example.com");
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

			{/* Actual canvas to display the generated QR code. */}
			<canvas
				ref={canvasRef}
				style={{ minWidth: "300px", minHeight: "300px" }}
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
