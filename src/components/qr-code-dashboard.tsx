"use client";

import { useState } from "react";

import { Box } from "@mui/material";

import { QRCodeTypesList } from "@/components/qr-code-types-list";
import { QRCodeForm } from "@/components/qr-code-form";

import "./qr-code-dashboard.css";

export function QRCodeDashboard() {
	const [QRType, setQRType] = useState("url");

	function onQRTypeChange(typeName: string) {
		setQRType(typeName);
	}

	return (
		<Box id="qr-code-dashboard">
			<QRCodeTypesList QRType={QRType} onQRTypeChange={onQRTypeChange} />
			<QRCodeForm QRType={QRType} />
		</Box>
	);
}
