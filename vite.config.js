import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const { createVuePlugin } = require("vite-plugin-vue2");

const path = require("path");

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  plugins: [
    createVuePlugin(),
    VitePWA({
      includeAssets: ["favicon.svg", "favicon.ico", "robots.txt", "apple-touch-icon.png"]
    })
  ]
});
