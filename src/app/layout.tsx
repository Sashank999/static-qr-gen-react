import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Static QR Generator",
  description: "A static QR code generator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
