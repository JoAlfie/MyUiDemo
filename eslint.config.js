import pluginVue from "eslint-plugin-vue";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import pluginVitest from "@vitest/eslint-plugin";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";

export default [
   {
      name: "app/files-to-lint",
      files: ["**/*.{ts,mts,tsx,vue}"],
   },

   {
      name: "app/files-to-ignore",
      ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**", "**/.vite-ssg-temp/**"],
   },

   // Adding Vue and TypeScript config
   ...pluginVue.configs["flat/essential"],
   ...vueTsEslintConfig(),

   // Custom rules
   {
      files: ["**/*.{js,jsx,ts,tsx,vue}"],
      rules: {
         "vue/attribute-hyphenation": "off",
         "vue/no-use-v-if-with-v-for": ["warn", { allowUsingIterationVar: true }],
         "vue/require-default-prop": "off",
         "vue/prop-name-casing": ["warn", "camelCase"],
         "vue/v-slot-style": "off",
         "vue/multi-word-component-names": "off",
         "vue/no-v-html": "off",
         "vue/enforce-style-attribute": ["error", { allow: ["scoped"] }],
         "no-undef": "off",
         "no-trailing-spaces": ["error", { skipBlankLines: true }],
         camelcase: ["off", { ignoreImports: true, ignoreGlobals: true, ignoreDestructuring: true }],
         "import/no-cycle": "off",
         "arrow-body-style": "off",
         "prefer-destructuring": ["warn", { object: true, array: false }],
         "one-var": ["error", "never"],
         "no-restricted-syntax": "off",
         "linebreak-style": 0,
         "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
         "no-unused-vars": "off",
         "no-console": ["warn", { allow: ["info", "warn", "error", "clear"] }],
         "no-var": "error",
         "no-param-reassign": ["warn", { props: false }],
         "keyword-spacing": "error",
         "comma-dangle": [
            "error",
            {
               arrays: "always-multiline",
               objects: "always-multiline",
               imports: "always-multiline",
               exports: "always-multiline",
               functions: "never",
            },
         ],
         "import/extensions": "off",
         "prefer-template": "error",
         "no-useless-escape": "warn",

         // TypeScript rules
         "@typescript-eslint/no-explicit-any": "warn",
         "@typescript-eslint/no-unused-vars": ["warn", { args: "none", vars: "all", ignoreRestSiblings: true }],
      },
   },

   // Vitest configurations
   {
      ...pluginVitest.configs.recommended,
      files: ["src/**/*.test.ts"],
   },

   // Prettier formatting skip configuration
   skipFormatting,
];
