import { Link } from "react-router";
import { getPages } from "~/lib/pages.server";
import type { Route } from "./+types/AllPages";

export const meta = [
  {
    title: "All Pages | Screeps Wiki",
  },
  {
    name: "description",
    content: "Index of all pages on the Screeps Wiki",
  },
];

export async function loader() {
  const pages = await getPages();
  return { pages };
}

export default function AllPages({
  loaderData: { pages },
}: Route.ComponentProps) {
  return (
    <div>
      <h1>All Pages</h1>
      <ul className="list-disc pl-6">
        {pages.map((page) => (
          <li key={page.slug} className="my-0">
            <Link
              to={`${page.slug}`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {page.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
