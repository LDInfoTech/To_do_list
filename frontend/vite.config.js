import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/To_do_list/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
