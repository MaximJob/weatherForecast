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
      srcDir: "public",
      filename: "sw.js",
      registerType: "autoUpdate",
      strategies: "injectManifest",
      includeAssets: ["favicon.svg", "favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "Прогноз погоды",
        short_name: "Прогноз погоды",
        description: "Прогноз погоды",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      }
    })
  ]
});
