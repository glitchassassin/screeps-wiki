import { useState } from "react";
import { Link, Outlet, useMatches } from "react-router";
import type { TocEntry } from "../../lib/remark/toc";

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

export default function WikiLayout() {
  const matches = useMatches();
  const [isContentsOpen, setIsContentsOpen] = useState(true);
  const handle = matches[matches.length - 1].handle as
    | {
        frontmatter: Record<string, any>;
        toc: TocEntry[];
      }
    | undefined;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-semibold text-gray-800 dark:text-gray-100 pt-2"
          >
            <img
              src="https://screeps.com/a/logotype.svg"
              alt="Screeps Wiki"
              className="h-8"
            />
          </Link>
          <div className="relative">
            <input
              type="search"
              placeholder="Search wiki..."
              className="w-64 px-4 py-1 border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 flex gap-6 py-6">
        {/* Left Sidebar */}
        <nav className="w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 shadow-sm p-4">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Main Page
                </Link>
              </li>
              <li>
                <Link
                  to="/getting-started"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Getting Started
                </Link>
              </li>
              <li>
                <Link
                  to="/api"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  API Reference
                </Link>
              </li>
              <li>
                <Link
                  to="/tutorials"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Tutorials
                </Link>
              </li>
            </ul>

            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-3">
              Tools
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/recent-changes"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Recent Changes
                </Link>
              </li>
              <li>
                <Link
                  to="/special-pages"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Special Pages
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">
          <div className="bg-white dark:bg-gray-800 shadow-sm p-6 prose prose-neutral dark:prose-invert max-w-none prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline">
            {handle && (
              <>
                {handle.frontmatter.title && (
                  <h1>{handle.frontmatter.title}</h1>
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
