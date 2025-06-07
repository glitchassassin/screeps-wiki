import mdx from "@mdx-js/rollup";
import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import rehypeSlug from "rehype-slug";
import rehypeStarryNight from "rehype-starry-night";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import remarkToc from "./app/lib/remark/toc";

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
  },
  plugins: [
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkGfm, remarkToc],
      rehypePlugins: [rehypeSlug, rehypeStarryNight],
    }),
    reactRouter(),
    tsconfigPaths(),
  ],
});
