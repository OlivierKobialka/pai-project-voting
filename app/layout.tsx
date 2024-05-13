import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Header, Providers } from "../components";

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
                    <main>
                        <Header />
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    );
}
