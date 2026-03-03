import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [vue()],
   resolve: {
      // Ensures these are sourced from the application's node_modules directory
      dedupe: ["vue", "lodash-es", "vue-draggable-next",],
      alias: {
         "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
   },
   build: {
      copyPublicDir: false,
      lib: {
         entry: path.resolve(__dirname, "src/index.ts"),
         name: "UILibrary",
         formats: ["es"],
         fileName: () => `index.js`,
      },
      assetsDir: "styles",
      rollupOptions: {
         external: ["vue"],
         output: {
            globals: {
               vue: "Vue",
            },
         },
      },
   },
   css: {
      preprocessorOptions: {
         scss: {
            api: "modern-compiler",
         },
      },
   },
});
