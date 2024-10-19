// @ts-ignore -- Not sure why this has type issue.
import { defineToolbarApp } from "astro/toolbar";
import { Footprint } from "@grantcodes/footprint";
import { FootprintAstro } from "./footprint-astro";

const footprint = new Footprint(performance);

footprint.ignored = [
  /\/node_modules\/astro/,
  /\/node_modules\/vite/,
  /\/node_modules\/.vite/,
  /\/@vite\/client/,
  /\/@id\/astro/,
  /\/@grantcodes\/footprint-astro/,
];

window.customElements.define("footprint-astro", FootprintAstro);

export default defineToolbarApp({
  // @ts-expect-error -- Astro doesn't seem to publish types for this yet.
  init(canvas, app) {
    const load = () => {
      // Add the UI.
      const container = document.createElement("astro-dev-toolbar-window");
      const footprintAstro = document.createElement("footprint-astro");
      // @ts-expect-error -- Not sure how to define this in typescript
      footprintAstro.footprint = footprint;
      container.appendChild(footprintAstro);
      canvas.append(container);

      // Check the total CO2 and show any warnings.
      const totalCo2 = footprint.resources.totalCo2;
      if (totalCo2 > 1) {
        app.toggleNotification({
          state: true,
          level: "warning",
        });
      }
    };

    // Load the UI when the page is loaded.
    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", () => setTimeout(load, 3000));
    } else {
      setTimeout(load, 3000);
    }
  },
});
