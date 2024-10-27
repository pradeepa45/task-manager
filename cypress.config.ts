import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  e2e: {
    baseUrl:"http://localhost:3000",
    setupNodeEvents(on, config) {
    },
    // size
    viewportWidth: 1920,
    viewportHeight: 1240,
    supportFile: false
  },
});
