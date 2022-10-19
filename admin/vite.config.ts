import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import vue from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/admin/",
  build: {
    outDir: "dist/admin/",
  },

  plugins: [
    tsconfigPaths({ loose: true }),
    vue({
      template: { transformAssetUrls },
    }),
    quasar({ autoImportComponentCase: "combined" }),
  ],
});
