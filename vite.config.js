import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        prestige: resolve(__dirname, "prestige.html"),
        novbytkhim: resolve(__dirname, "novbytkhim.html"),
        raduga: resolve(__dirname, "raduga.html"),
        qis: resolve(__dirname, "qis.html"),
        izower: resolve(__dirname, "izower.html"),
        silex: resolve(__dirname, "silex.html"),
      },
    },
  },
});
