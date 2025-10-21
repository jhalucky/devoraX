// src/lib/fonts.ts
import { DM_Serif_Display, Source_Sans_3 } from "next/font/google";

export const headingFont = DM_Serif_Display({ subsets: ["latin"], weight: "400" });
export const bodyFont = Source_Sans_3({ subsets: ["latin"], weight: ["400","600"] });
