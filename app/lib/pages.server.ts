import type { ServerBuild } from "react-router";

export type Frontmatter = {
  title?: string;
  description?: string;
  quicklink?: boolean;
  categories?: string[];
};

export type PageMeta = {
  slug: string;
  frontmatter: Frontmatter;
};

export const getPages = async (): Promise<PageMeta[]> => {
  const modules = import.meta.glob<{ frontmatter: Frontmatter }>(
    "../routes/_wiki+/*.(mdx|md)",
    { eager: true }
  );
  const build = (await import(
    // @ts-ignore
    "virtual:react-router/server-build"
  )) as ServerBuild;
  const pages = Object.entries(modules).map(([file, page]) => {
    const id = file.replace("../", "").replace(/\.mdx?$/, "");

    if (build.routes[id] === undefined) throw new Error(`No route for ${id}`);

    return {
      slug: "/" + (build.routes[id].path ?? ""),
      frontmatter: page.frontmatter,
    };
  });
  return sortBy(pages, (page) => page.frontmatter.title, "desc");
};

function sortBy<T>(
  arr: T[],
  key: (item: T) => unknown,
  dir: "asc" | "desc" = "asc"
) {
  return arr.sort((a, b) => {
    const res = compare(key(a), key(b));
    return dir === "asc" ? res : -res;
  });
}

function compare<T>(a: T, b: T): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
