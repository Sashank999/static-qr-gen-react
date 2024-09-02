import { Box, List, ListItem, ListItemButton, ListItemIcon } from "@mui/material";

import { Link as LinkIcon, Email as EmailIcon, Image as ImageIcon, SvgIconComponent } from '@mui/icons-material';

import "./qr-code-types-list.css";
import React from "react";

export const QR_TYPES: { [key: string]: [string, SvgIconComponent] } = {
	url: ["URL to QR Code", LinkIcon],
	email: ["Email to QR Code", EmailIcon],
	image: ["Image to QR Code", ImageIcon]
};

export function QRCodeTypesList({
	QRType,
	onQRTypeChange
}: {
	QRType: string;
	onQRTypeChange: (typeName: string) => void;
}) {
	return (
		<Box id="qr-code-types-list-container">
			<List id="qr-code-types-list">
				{Object.keys(QR_TYPES).map((typeName) => {
					return (
						<ListItem
							key={typeName}
							onClick={() => onQRTypeChange(typeName)}
							disablePadding
						>
							<ListItemButton selected={QRType === typeName} sx={{ py: 2 }}>
								<ListItemIcon>
									{React.createElement(QR_TYPES[typeName][1], {}, [])}
								</ListItemIcon>
								{QR_TYPES[typeName][0]}
							</ListItemButton>
						</ListItem>
					);
				})}
			</List>
		</Box>
	);
}
