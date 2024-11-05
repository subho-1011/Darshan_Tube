import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { ThemeProvider } from "@/components/theme/theme-provider";

import { Toaster } from "@/components/ui/toaster";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Sidebar, SideBarProvider } from "@/components/layout/sidebar";
import Providers from "./providers";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: {
        default: "DarshanTube",
        template: "%s | DarshanTube",
    },
    description: "DarshanTube is a video sharing platform",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <Providers>
                        <div className="flex flex-col min-h-screen w-full">
                            <Header />
                            <SideBarProvider>
                                <div className="flex flex-1 w-full items-stretch min-h-[calc(100vh-64px)]">
                                    <Sidebar />
                                    <main className="flex-1 flex w-full p-4">
                                        {children}
                                        <Toaster />
                                    </main>
                                </div>
                            </SideBarProvider>
                            <Footer />
                        </div>
                    </Providers>
                </ThemeProvider>
            </body>
        </html>
    );
}
