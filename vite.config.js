import { cpSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

// JSX uses root-relative image URLs. Keep those assets and the existing static
// pages available in production as well as in the development server.
export default defineConfig({
  plugins: [{
    name: "preserve-static-pages",
    writeBundle(options) {
      const outputDirectory = options.dir;
      for (const path of [
        "images", "fonts", "css", "login", "signup", "faq", "privacy",
        "free.html", "landing.html", "form.js", "modal.js", "userData.js",
        "main.js", "ArticleService.js", "ProductService.js",
      ]) {
        cpSync(resolve(import.meta.dirname, path), resolve(outputDirectory, path), {
          recursive: true,
        });
      }
    },
  }],
});
