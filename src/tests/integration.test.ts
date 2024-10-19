import { describe, it } from "node:test";
import assert from "node:assert";

import integration from "../integration";

describe("integration", () => {
  it("Has name set", () => {
    assert.strictEqual(integration.name, "footprint-astro");
  });

  it("Has hook set", () => {
    assert.strictEqual(
      typeof integration.hooks["astro:config:setup"],
      "function",
    );
  });
});
