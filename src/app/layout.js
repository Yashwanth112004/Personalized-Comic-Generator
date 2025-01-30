import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Navbar from '@/components/Navbar';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "EduAI - Personalized Learning",
    description: "AI-Powered Educational Platform with Personalized Learning Paths",
};

export default function RootLayout({ children }) {
    return ( <
        html lang = "en" >
        <
        body className = { `${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-blue-900 to-purple-900` } >
        <
        Navbar / >
        <
        main className = "pt-20 pb-8 px-4 min-h-screen" > { children } <
        /main> < /
        body > <
        /html>
    );
}