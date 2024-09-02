import { List, ListItem, ListItemButton } from "@mui/material";

import "./qr-code-types-list.css";

export const QR_TYPES: { [key: string]: string } = {
	url: "URL to QR Code",
	email: "Email to QR Code",
	image: "Image to QR Code"
};

export function QRCodeTypesList({
	QRType,
	onQRTypeChange
}: {
	QRType: string;
	onQRTypeChange: (typeName: string) => void;
}) {
	return (
		<List id="qr-code-types-list">
			{Object.keys(QR_TYPES).map((typeName) => {
				return (
					<ListItem
						key={typeName}
						onClick={() => onQRTypeChange(typeName)}
						disablePadding
					>
						<ListItemButton selected={QRType === typeName} sx={{ py: 2 }}>
							{QR_TYPES[typeName]}
						</ListItemButton>
					</ListItem>
				);
			})}
		</List>
	);
}
