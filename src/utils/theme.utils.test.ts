import { describe, it, expect } from "vitest";
import { bgColorToBaseColor, baseColorToBgColor } from "./theme.utils.ts";
import { COLOUR_THEMES, BG_COLOUR_THEMES, type ColourTheme } from "../types/themes.type.ts";

describe("theme.utils", () => {
   describe("bgColorToBaseColor", () => {
      it("converts valid background color themes to base color themes", () => {
         // Test that all bg-colors can be converted to the correct base color
         Object.values(COLOUR_THEMES).forEach((baseColor) => {
            const bgColor = `bg-${baseColor}`;
            const result = bgColorToBaseColor(bgColor);
            expect(result).toBe(baseColor);
         });
      });

      it("handles invalid background color themes by falling back to neutral", () => {
         expect(bgColorToBaseColor("bg-invalid")).toBe(COLOUR_THEMES.NEUTRAL);
         expect(bgColorToBaseColor("bg-unknown")).toBe(COLOUR_THEMES.NEUTRAL);
         expect(bgColorToBaseColor("bg-")).toBe(COLOUR_THEMES.NEUTRAL);
         expect(bgColorToBaseColor("invalid")).toBe(COLOUR_THEMES.NEUTRAL);
         expect(bgColorToBaseColor("")).toBe(COLOUR_THEMES.NEUTRAL);
         expect(bgColorToBaseColor(null as unknown as string)).toBe(COLOUR_THEMES.NEUTRAL);
         expect(bgColorToBaseColor(undefined as unknown as string)).toBe(COLOUR_THEMES.NEUTRAL);
      });
   });

   describe("baseColorToBgColor", () => {
      it("converts valid base color themes to background color themes", () => {
         // Test that all base colors can be converted to the correct background color
         Object.values(COLOUR_THEMES).forEach((baseColor) => {
            const result = baseColorToBgColor(baseColor);
            const expected = `bg-${baseColor}`;
            expect(result).toBe(expected);
            expect(Object.values(BG_COLOUR_THEMES)).toContain(result);
         });
      });

      it("handles invalid color themes by falling back to neutral", () => {
         const invalidColours = ["invalid", "unknown", "lilac", "", null, undefined];

         invalidColours.forEach((colour) => {
            expect(baseColorToBgColor(colour as unknown as ColourTheme)).toBe(BG_COLOUR_THEMES.NEUTRAL);
         });
      });
   });
});
