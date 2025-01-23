import { Link } from "react-router";
import { getPages } from "~/lib/pages.server";
import type { Route } from "./+types/categories._index";

export const meta = [
  {
    title: "Categories | Screeps Wiki",
  },
  {
    name: "description",
    content: "Index of all categories on the Screeps Wiki",
  },
];

export async function loader() {
  const pages = await getPages();
  const categoriesMap = new Map<string, { title: string; slug: string }[]>();

  pages.forEach((page) => {
    const categories = page.frontmatter.categories || [];
    categories.forEach((category) => {
      const existing = categoriesMap.get(category) || [];
      existing.push({
        title: page.frontmatter.title || "Untitled",
        slug: page.slug,
      });
      categoriesMap.set(category, existing);
    });
  });

  // Convert map to sorted array
  const categories = Array.from(categoriesMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, pages]) => ({
      name: category,
      pages: pages.sort((a, b) => a.title.localeCompare(b.title)),
    }));

  return { categories };
}

export default function Categories({
  loaderData: { categories },
}: Route.ComponentProps) {
  return (
    <div>
      <h1>Categories</h1>
      <ul className="list-disc pl-6">
        {categories.map((category) => (
          <li key={category.name} className="my-0">
            <Link
              to={`/categories/${category.name}`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
