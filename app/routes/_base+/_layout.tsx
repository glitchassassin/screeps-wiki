import { clsx } from "clsx";
import { useState } from "react";
import { Outlet } from "react-router";
import { Search } from "~/components/Search";
import { WikiHeader } from "~/components/WikiHeader";
import { getPages } from "~/lib/pages.server";
import type { TocEntry } from "../../lib/remark/toc";
import type { Route } from "./+types/_layout";

export async function loader() {
  const pages = await getPages();
  const quicklinks = pages.filter((page) => page.frontmatter.quicklink);
  return { quicklinks };
}

function TableOfContents({ entries }: { entries: TocEntry[] }) {
  return (
    <ul className="">
      {entries.map((entry) => (
        <li key={entry.slug} className="ml-6 list-decimal">
          <a
            href={`#${entry.slug}`}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {entry.text}
          </a>
          {entry.children.length > 0 && (
            <TableOfContents entries={entry.children} />
          )}
        </li>
      ))}
    </ul>
  );
}

export default function WikiLayout({
  loaderData: { quicklinks },
  matches,
}: Route.ComponentProps) {
  const [isContentsOpen, setIsContentsOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handle = matches[matches.length - 1]?.handle as
    | {
        frontmatter: Record<string, any>;
        toc: TocEntry[];
        filename?: string;
      }
    | undefined;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <WikiHeader filename={handle?.filename} />
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-6 py-6">
        {/* Left Sidebar */}
        <nav className="md:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 shadow-sm p-4">
            <div className="flex items-center justify-between gap-8">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                Navigation
              </h3>
              <button
                onClick={() => setIsSidebarOpen((prev) => !prev)}
                className="block md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {isSidebarOpen ? "[ − ]" : "[ + ]"}
              </button>
            </div>
            <Search
              className={clsx(
                isSidebarOpen ? "block" : "hidden",
                "md:block",
                "mt-4"
              )}
            />
            <ul
              className={clsx(
                "space-y-2",
                isSidebarOpen ? "block" : "hidden",
                "md:block",
                "mt-4"
              )}
            >
              <li>
                <a
                  href="/"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Main Page
                </a>
              </li>
              <li className="border-t border-gray-200 dark:border-gray-700 my-4"></li>
              {quicklinks.map((page) => (
                <li key={page.slug}>
                  <a
                    href={page.slug}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {page.frontmatter.title}
                  </a>
                </li>
              ))}
              <li className="border-t border-gray-200 dark:border-gray-700 my-4"></li>
              <li>
                <a
                  href="/AllPages"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  All Pages
                </a>
              </li>
              <li>
                <a
                  href="/Categories"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Categories
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">
          <div className="bg-white dark:bg-gray-800 shadow-sm p-6 prose prose-neutral dark:prose-invert max-w-none prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-pre:whitespace-pre-wrap prose-table:w-auto">
            {handle && (
              <>
                {handle.frontmatter.title && (
                  <h1 className="mb-2">{handle.frontmatter.title}</h1>
                )}
                {handle.frontmatter.categories && (
                  <div className="not-prose flex gap-2 flex-wrap mb-4">
                    {handle.frontmatter.categories.map((category: string) => (
                      <a
                        key={category}
                        href={`/Categories/${category}`}
                        className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm hover:bg-blue-200 dark:hover:bg-blue-800"
                      >
                        {category}
                      </a>
                    ))}
                  </div>
                )}
                {handle.frontmatter.description && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: handle.frontmatter.description,
                    }}
                  />
                )}
                {handle.toc.length > 0 && (
                  <div className="not-prose p-4 my-4 bg-gray-100 dark:bg-gray-700 shadow-lg inline-block min-w-[200px] rounded">
                    <div className="flex items-center justify-between mb-2 gap-8">
                      <h3 className="text-lg font-semibold whitespace-nowrap">
                        Contents
                      </h3>
                      <button
                        onClick={() => setIsContentsOpen((prev) => !prev)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        {isContentsOpen ? "[ − ]" : "[ + ]"}
                      </button>
                    </div>
                    {isContentsOpen && <TableOfContents entries={handle.toc} />}
                  </div>
                )}
              </>
            )}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
