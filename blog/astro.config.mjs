import { defineConfig } from "astro/config";

import image from "@astrojs/image";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  server: (command) => ({
    port: command === "dev" ? 3000 : parseInt(process.env.PORT ?? 3000),
    host: "0.0.0.0",
  }),
  integrations: [
    tailwind({
      config: { applyBaseStyles: false },
    }),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
  ],
});
