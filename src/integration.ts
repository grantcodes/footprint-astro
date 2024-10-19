import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";

export default {
  name: "footprint-astro",
  hooks: {
    "astro:config:setup": ({ addDevToolbarApp }) => {
      addDevToolbarApp({
        id: "footprint-astro",
        name: "Footprint",
        icon: "🌱",
        entrypoint: fileURLToPath(new URL("./app.js", import.meta.url)),
      });
    },
  },
} satisfies AstroIntegration;
