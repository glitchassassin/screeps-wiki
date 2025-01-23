import type { Config } from "@react-router/dev/config";
import fs from "node:fs/promises";
import path from "node:path";
import { parse as parseYaml } from "yaml";

export default {
  ssr: true,
  prerender: async ({ getStaticPaths }) => {
    const paths = getStaticPaths();
    const wikiDir = path.join(process.cwd(), "app/routes/_base+/_wiki+");
    const files = await fs.readdir(wikiDir);
    const mdFiles = files.filter(
      (file) => file.endsWith(".md") || file.endsWith(".mdx")
    );

    const categories = new Set<string>();

    for (const file of mdFiles) {
      const content = await fs.readFile(path.join(wikiDir, file), "utf-8");
      const match = content.match(/^---\n([\s\S]*?)\n---/);

      if (match) {
        try {
          const frontmatter = parseYaml(match[1]);
          if (frontmatter.categories) {
            frontmatter.categories.forEach((category: string) =>
              categories.add(category)
            );
          }
        } catch (e) {
          console.warn(`Failed to parse frontmatter in ${file}:`, e);
        }
      }
    }

    for (const category of categories) {
      paths.push(`/Categories/${category}`);
    }

    return paths;
  },
} satisfies Config;
