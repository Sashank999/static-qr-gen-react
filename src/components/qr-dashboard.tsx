"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

import {
	Box,
	Button,
	FormControl,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	TextField
} from "@mui/material";

import QRCode from "qrcode";

const QR_TYPES: { [key: string]: string } = {
	url: "URL to QR Code",
	email: "Email to QR Code",
	image: "Image to QR Code"
};

export function QRCodeDashboard() {
	const [QRType, setQRType] = useState("url");

	function onQRTypeChange(typeName: string) {
		setQRType(typeName);
	}

	return (
		<Box
			sx={{
				display: "flex",
				flexFlow: "row",
				height: "100vh",
				alignItems: "center"
			}}
		>
			<QRCodeList QRType={QRType} onQRTypeChange={onQRTypeChange} />
			<QRCodeForm QRType={QRType} />
		</Box>
	);
}

function QRCodeList({
	QRType, onQRTypeChange
}: {
	QRType: string,
	onQRTypeChange: (typeName: string) => void;
}) {
	return (
		<List
			sx={{
				width: "30%",
				height: "100%",
				display: "flex",
				flexFlow: "column",
				justifyContent: "center",
				borderRight: "2px solid #fff"
			}}
		>
			{Object.keys(QR_TYPES).map((typeName) => {
				return (
					<ListItem key={typeName} onClick={() => onQRTypeChange(typeName)} disablePadding>
						<ListItemButton selected={QRType === typeName} sx={{ py: 2 }}>{QR_TYPES[typeName]}</ListItemButton>
					</ListItem>
				);
			})}
		</List>
	);
}

function QRCodeForm({ QRType }: { QRType: string }) {
	const [email, setEmail] = useState("example@example.com");
	const [url, setURL] = useState("www.example.com");
	const canvasRef = useRef(null);

	// For the initially rendering the canvas with an www.example.com URL.
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

	function downloadImage(MIMEType="image/png", filename="qr.png") {
		const anchor = document.createElement("a");
		const canvas = canvasRef.current as unknown as HTMLCanvasElement;
		canvas.toBlob((blob) => {
			if (!blob) {
				alert("Too much data or image format unsupported.");
				return;
			}

			const blobURL = URL.createObjectURL(blob);
			anchor.download = filename;
			anchor.href = blobURL;
			anchor.click();
			URL.revokeObjectURL(blobURL);
		}, MIMEType, 1);
	}

	return (
		<Box
			sx={{
				display: "flex",
				flexFlow: "column",
				alignItems: "center",
				justifyContent: "center",
				width: "70%",
				gap: "20px"
			}}
		>
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
			<canvas ref={canvasRef} style={{ minWidth: "300px", minHeight: "300px" }}></canvas>

			{/* Download buttons. */}
			<Box sx={{ display: "flex", gap: 9 }}>
				<Button onClick={() => downloadImage("image/png", "qr.png")} variant="contained">Download as PNG</Button>
				<Button onClick={() => downloadImage("image/jpeg", "qr.jpeg")} variant="contained">Download as JPEG</Button>
			</Box>
		</Box>
	);
}
