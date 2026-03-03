export const THEMES = {
   BRAND: "brand",
   INFO: "info",
   SUCCESS: "success",
   WARNING: "warning",
   DANGER: "danger",
   NEUTRAL: "neutral",
} as const;

export type Theme = (typeof THEMES)[keyof typeof THEMES];

export const COLOUR_THEMES = {
   GREEN: "green",
   RED: "red",
   BLUE: "blue",
   BRAND: "brand",
   YELLOW: "yellow",
   PURPLE: "purple",
   NEUTRAL: "neutral",
   PINK: "pink",
   SAND: "sand",
   TAN: "tan",
} as const;

// Color value mapping for display purposes (eg: colour picker, theme selector, etc.)
export const COLOUR_THEME_VALUES: Record<string, string> = {
   [COLOUR_THEMES.NEUTRAL]: "var(--grey-30)",
   [COLOUR_THEMES.BRAND]: "var(--brand-20)",
   [COLOUR_THEMES.BLUE]: "var(--blue-30)",
   [COLOUR_THEMES.RED]: "var(--red-30)",
   [COLOUR_THEMES.YELLOW]: "var(--yellow-30)",
   [COLOUR_THEMES.GREEN]: "var(--green-30)",
   [COLOUR_THEMES.PURPLE]: "var(--purple-30)",
   [COLOUR_THEMES.SAND]: "var(--sand-30)",
   [COLOUR_THEMES.PINK]: "var(--pink-30)",
   [COLOUR_THEMES.TAN]: "var(--tan-30)",
};

export type ColourTheme = (typeof COLOUR_THEMES)[keyof typeof COLOUR_THEMES];

// Helper to prefix all values with "bg-"
function makeBgColourThemes<T extends Record<string, string>>(themes: T) {
   return Object.fromEntries(Object.entries(themes).map(([key, value]) => [key, `bg-${value}`])) as {
      [K in keyof T]: `bg-${T[K]}`;
   };
}

export const BG_COLOUR_THEMES = makeBgColourThemes(COLOUR_THEMES);

export type BgColourTheme = (typeof BG_COLOUR_THEMES)[keyof typeof BG_COLOUR_THEMES];
