import { List, ListItem, ListItemButton } from "@mui/material";


export const QR_TYPES: { [key: string]: string } = {
	url: "URL to QR Code",
	email: "Email to QR Code",
	image: "Image to QR Code"
};


export function QRCodeTypesList({
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
