import type {
  Footprint,
  FootprintResources,
  FootprintResource,
} from "@grantcodes/footprint";
import { style } from "./style";

interface FootprintAstroCategory {
  name: string;
  description: string;
  resources: FootprintResources;
}

class FootprintAstro extends HTMLElement {
  _footprint!: Footprint;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set footprint(value: Footprint) {
    this._footprint = value;
  }

  get footprint(): Footprint {
    return this._footprint;
  }

  get categories(): FootprintAstroCategory[] {
    const footprint = this.footprint;

    const htmlResources = footprint.getByCategory("html");
    const cssResources = footprint.getByCategory("css");
    const jsResources = footprint.getByCategory("js");
    const imageResources = footprint.getByCategory("media");
    const otherResources = footprint.getByCategory("other");

    const categories = [
      {
        name: "HTML",
        description: "The base html document",
        resources: htmlResources,
      },
      {
        name: "CSS",
        description: "First and 3rd party CSS loaded on th`is page",
        resources: cssResources,
      },
      {
        name: "JavaScript",
        description: "First and 3rd party JavaScript loaded on this page",
        resources: jsResources,
      },
      {
        name: "Images",
        description: "Images loaded on this page",
        resources: imageResources,
      },
      {
        name: "Other",
        description:
          "Everything else, and anything this tool failed to recognize",
        resources: otherResources,
      },
    ];

    return categories;
  }

  async connectedCallback() {
    if (this.shadowRoot === null) {
      return;
    }

    this.shadowRoot.innerHTML = this.render();
  }

  renderResource(resource: FootprintResource): string {
    return `
        <tr class="${resource.co2 > 1 ? "warning" : ""}">
            <td>${resource.name.replace(window.location.origin, "")}</td>
            <td class="amount">${resource.sizeString} ${
              resource.isEstimated ? "(estimate)" : ""
            }</td>
            <td class="amount">${resource.co2.toFixed(3)}g</td>
        </tr>
    `;
  }

  renderCategory(category: FootprintAstroCategory): string {
    return `
        <details>
                <summary>
                    <span class="category">
                        ${category.name}
                    </span>
                    <span class="amount">
                        ${category.resources.totalCo2.toFixed(3)}g
                    </span>
                </summary>
            <table>
                <thead>
                    <tr>
                        <th>Resource</th>
                        <th class="amount">Size</th>
                        <th class="amount">CO2</th>
                    </tr>
                </thead>
                <tbody>
                    ${category.resources.map((resource: FootprintResource) => this.renderResource(resource)).join("")}
                </tbody>
            </table>
        </details>
    `;
  }

  render(): string {
    const footprint = this.footprint;
    const allResources = footprint.resources;
    const totalCo2 = allResources.totalCo2;

    const categoriesHtml = this.categories
      .filter((category) => category.resources.totalCo2 > 0)
      .map((category) => this.renderCategory(category))
      .join("");

    return `
        <style>${style}</style>
        <h2>Page total CO2 ${totalCo2.toFixed(3)}g</h2>
        ${categoriesHtml}
    `;
  }
}

export { FootprintAstro };
