const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: `http://${process.env.NODE_HOST ?? "localhost"}:${process.env.NODE_PORT ?? 8080}`
  },
});
