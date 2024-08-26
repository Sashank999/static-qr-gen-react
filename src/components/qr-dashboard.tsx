"use client";

import { useState } from "react";

import { ListItem } from "@mui/material";
import Button from "@mui/material/Button";
import List from "@mui/material/List";

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
		<>
			<QRCodeList setQRType={onQRTypeChange} />
			<QRCodeForm QRType={QRType} />
			<Button variant="contained">Abc</Button>
		</>
	);
}

function QRCodeList({ setQRType }: { setQRType: (typeName: string) => void }) {
	return (
		<>
			<div>
				<List>
					{Object.keys(QR_TYPES).map((typeName) => {
						return (
							<ListItem key={typeName} onClick={() => setQRType(typeName)}>
								{QR_TYPES[typeName]}
							</ListItem>
						);
					})}
				</List>
			</div>
		</>
	);
}

function QRCodeForm({ QRType }: { QRType: string }) {
	return (
		<>
			<div>{QRType}</div>
		</>
	);
}
