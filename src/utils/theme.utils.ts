import { COLOUR_THEMES, BG_COLOUR_THEMES, type ColourTheme, type BgColourTheme } from "../types/themes.type.ts";

// Utility function to convert background color theme back to base color theme
// e.g. "bg-green" -> "green"
export function bgColorToBaseColor(bgColor: string): ColourTheme {
   if (!bgColor) return COLOUR_THEMES.NEUTRAL;

   // Remove "bg-" prefix to get the base color
   const baseColor = bgColor.replace("bg-", "");

   // Find the matching key in COLOUR_THEMES
   const matchingKey = Object.entries(COLOUR_THEMES).find(([_, value]) => value === baseColor)?.[0];

   if (matchingKey) {
      return COLOUR_THEMES[matchingKey as keyof typeof COLOUR_THEMES];
   }

   // Fallback to neutral if no match found
   return COLOUR_THEMES.NEUTRAL;
}

// Utility function to convert base color theme to background color theme
// e.g. "green" -> "bg-green"
export function baseColorToBgColor(baseColor: ColourTheme): BgColourTheme {
   if (!baseColor) return BG_COLOUR_THEMES.NEUTRAL;

   const bgColor = `bg-${baseColor}`;

   // Check if the result exists as a valid BG_COLOUR_THEMES value
   const isValidBgColor = Object.values(BG_COLOUR_THEMES).includes(bgColor as BgColourTheme);

   if (isValidBgColor) {
      return bgColor as BgColourTheme;
   }

   // Fallback to neutral if the result doesn't exist as a valid BG_COLOUR_THEMES value
   return BG_COLOUR_THEMES.NEUTRAL;
}
