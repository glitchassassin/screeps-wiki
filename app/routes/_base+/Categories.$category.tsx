import { getPages } from "~/lib/pages.server";
import type { Route } from "./+types/Categories.$category";

export const meta = ({ params }: Route.MetaArgs) => [
  {
    title: `${params.category} | Screeps Wiki`,
  },
];

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
  params,
}: Route.ComponentProps) {
  return (
    <div>
      <h1>{params.category}</h1>
      <ul className="list-disc pl-6">
        {pages.map((page) => (
          <li key={page.slug} className="my-0">
            <a
              href={page.slug}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {page.frontmatter.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
