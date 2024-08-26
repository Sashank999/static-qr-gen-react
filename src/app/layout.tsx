import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import theme from "@/theme";

export const metadata: Metadata = {
	title: "Static QR Generator",
	description: "A static QR code generator."
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<AppRouterCacheProvider>
					<ThemeProvider theme={theme}>{children}</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
