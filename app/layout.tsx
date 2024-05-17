import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Providers from "../components/Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = { title: "Poller" };

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <Header />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
