"use client";

import { ChangeEvent, useRef, useState } from "react";

import {
	Box,
	FormControl,
	List,
	ListItem,
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
			<QRCodeList onQRTypeChange={onQRTypeChange} />
			<QRCodeForm QRType={QRType} />
		</Box>
	);
}

function QRCodeList({
	onQRTypeChange
}: {
	onQRTypeChange: (typeName: string) => void;
}) {
	return (
		<List
			sx={{
				m: 2,
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
					<ListItem key={typeName} onClick={() => onQRTypeChange(typeName)}>
						<ListItemText primary={QR_TYPES[typeName]}></ListItemText>
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

	function onURLChange(event: ChangeEvent<HTMLInputElement>) {
		setURL(event.target.value);
		if (!event.target.value) return;

		QRCode.toCanvas(canvasRef.current, event.target.value, (error) => {
			if (error) alert(error);
		});
	}

	function onEmailChange(event: ChangeEvent<HTMLInputElement>) {
		setEmail(event.target.value);
		if (!event.target.value) return;

		QRCode.toCanvas(
			canvasRef.current,
			"mailto:" + event.target.value,
			(error) => {
				if (error) alert(error);
			}
		);
	}

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "70%"
			}}
		>
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
			<canvas ref={canvasRef} width="200px" height="200px"></canvas>
		</Box>
	);
}
