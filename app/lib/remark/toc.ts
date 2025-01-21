import { valueToEstree } from "estree-util-value-to-estree";
import GithubSlugger from "github-slugger";
import { toString } from "mdast-util-to-string";
import { parse as parseToml } from "toml";
import { visit } from "unist-util-visit";
import { parse as parseYaml } from "yaml";

export interface TocEntry {
  text: string;
  slug: string;
  level: number;
  children: TocEntry[];
}

type FrontmatterType = "yaml" | "toml";

const parsers: Record<FrontmatterType, (input: string) => any> = {
  yaml: parseYaml,
  toml: parseToml,
};

function buildTocTree(
  entries: { text: string; slug: string; level: number }[]
): TocEntry[] {
  const root: TocEntry[] = [];
  const stack: TocEntry[] = [];

  entries.forEach((entry) => {
    const node: TocEntry = { ...entry, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].level >= entry.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
    }

    stack.push(node);
  });

  return root;
}

const createMdxjsEsmNode = (exports: Record<string, any>) => {
  return {
    type: "mdxjsEsm",
    data: {
      estree: {
        type: "Program",
        sourceType: "module",
        body: [
          {
            type: "ExportNamedDeclaration",
            source: null,
            specifiers: [],
            declaration: {
              type: "VariableDeclaration",
              kind: "const",
              declarations: Object.entries(exports).map(
                ([identifier, value]) => ({
                  type: "VariableDeclarator",
                  id: { type: "Identifier", name: identifier },
                  init: valueToEstree(value),
                })
              ),
            },
          },
        ],
      },
    },
  };
};

export default function remarkToc() {
  return (tree: any) => {
    // Extract frontmatter
    let frontmatter: Record<string, any> = {};
    visit(tree, ["yaml", "toml"], (node: any) => {
      try {
        const parser = parsers[node.type as FrontmatterType];
        frontmatter = parser(node.value);
      } catch (e) {
        console.warn(`Failed to parse ${node.type} frontmatter:`, e);
      }
    });

    // Extract TOC
    const slugger = new GithubSlugger();
    const headings: { text: string; slug: string; level: number }[] = [];

    visit(tree, "heading", (node: any) => {
      const text = toString(node);
      const slug = slugger.slug(text);
      headings.push({
        text,
        slug,
        level: node.depth,
      });
    });

    const toc = buildTocTree(headings);

    // Create export nodes
    const handleNode = createMdxjsEsmNode({
      handle: {
        frontmatter,
        toc,
      },
      frontmatter,
    });

    // Add exports to the beginning of the tree
    tree.children.unshift(handleNode);
  };
}
