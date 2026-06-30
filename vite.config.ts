import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Change this value if the GitHub repository is renamed.
const repositoryName = "proto";
const pagesBase = repositoryName.endsWith(".github.io")
  ? "/"
  : `/${repositoryName}/`;

export default defineConfig({
  base: pagesBase,
  plugins: [react(), tailwindcss()],
});
