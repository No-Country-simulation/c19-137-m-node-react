import { Arsenal } from "next/font/google";

export const arsenal = Arsenal ({
    weight: ["400", "700"],
    subsets: ["latin", "latin-ext"],
    adjustFontFallback: true,
    variable: "--font-arsenal",
    display: "swap",
    preload: true,
})