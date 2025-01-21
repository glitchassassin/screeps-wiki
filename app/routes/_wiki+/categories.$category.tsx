import { Link } from "react-router";
import { getPages } from "~/lib/pages.server";
import type { Route } from "./+types/categories.$category";

export async function loader({ params }: Route.LoaderArgs) {
  const pages = (await getPages()).filter((p) =>
    p.frontmatter.categories?.includes(params.category)
  );

  if (!pages.length) {
    throw new Response("Not Found", { status: 404 });
  }

  return {
    pages,
  };
}

export default function Categories({
  loaderData: { pages },
}: Route.ComponentProps) {
  return (
    <div>
      <h1>Categories</h1>
      <ul className="list-disc pl-6">
        {pages.map((page) => (
          <li key={page.slug} className="my-0">
            <Link
              to={page.slug}
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
