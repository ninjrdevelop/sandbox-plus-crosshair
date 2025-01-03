import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Sandbox+ Crosshair Generator",
	description: "A Crosshair Generator foro the Sandbox-Plus game within the S&box ecosystem.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`antialiased`}>{children}</body>
		</html>
	);
}
