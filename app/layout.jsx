import "./globals.css";
import {SITE_INFO} from "@/data/constants";
import {dmSans, overpassMono} from "@/app/font";

export const metadata = {
    title: `${SITE_INFO.title}`,
    description: "A modern markdown notes app built with Next.js",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={`${dmSans.variable} ${overpassMono.variable} bg-gray-900 text-gray-100 font-sans antialiased`}>
        {children}
        </body>
        </html>
    );
}
