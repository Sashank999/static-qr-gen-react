"use client";

import { useState } from "react";

const QR_TYPES: { [key: string]: string } = { url: "URL to QR Code", email: "Email to QR Code", image: "Image to QR Code" };

export function QRCodeDashboard() {
	const [QRType, setQRType] = useState("url");

	function onQRTypeChange(typeName: string) {
		setQRType(typeName);
	}

	return (<>
		<QRCodeList setQRType={onQRTypeChange} />
		<QRCodeForm QRType={QRType} />
	</>);
}

function QRCodeList({ setQRType }: { setQRType: (typeName: string) => void }) {
	return (<>
		<div>
			<ul>
				{
					Object.keys(QR_TYPES).map(typeName => {
						return <li onClick={() => setQRType(typeName)}>{QR_TYPES[typeName]}</li>;
					})
				}
			</ul>
		</div>
	</>);
}

function QRCodeForm({ QRType }: { QRType: string }) {
	return (<>
		<div>{QRType}</div>
	</>);
}
