# footprint-astro

An Astro dev toolbar integration that gives you CO2 estimates for all the resources on your Astro website.

## Installation

```sh
npm install @grantcodes/footprint-astro --save-dev
```

## Usage

astro.config.mjs
```js
import { defineConfig } from 'astro/config'
import footprintAstro from '@grantcodes/footprint-astro';

export default defineConfig({
    integrations: {
        footprintAstro,
    }
})
```