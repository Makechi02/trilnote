import {DM_Sans, Overpass_Mono} from "next/font/google";

export const dmSans = DM_Sans({
    subsets: ['latin'],
    weights: [400, 500, 700],
    styles: ["normal", "italic"],
    display: 'swap',
    variable: '--font-dm-sans'
});

export const overpassMono = Overpass_Mono({
    subsets: ['latin'],
    weights: [400, 500, 600],
    styles: ["normal", "italic"],
    display: 'swap',
    variable: '--font-overpass-mono'
});
