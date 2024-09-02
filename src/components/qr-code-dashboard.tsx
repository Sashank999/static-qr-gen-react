"use client";

import { useState } from "react";

import { Box } from "@mui/material";

import { QRCodeTypesList } from "@/components/qr-code-types-list";
import { QRCodeForm } from "@/components/qr-code-form";


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
			<QRCodeTypesList QRType={QRType} onQRTypeChange={onQRTypeChange} />
			<QRCodeForm QRType={QRType} />
		</Box>
	);
}
