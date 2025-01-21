import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";

import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import { WikiHeader } from "./components/WikiHeader";
import { REPO_URL } from "./data";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let title = "Error";
  let message = "An unexpected error occurred.";
  let createFilename: string | undefined = undefined;

  const location = useLocation();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "Page Not Found";
      message =
        "The requested wiki page could not be found. You can help by creating it!";
      createFilename = location.pathname.slice(1);
    } else {
      title = `${error.status} Error`;
      message = error.statusText || message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <WikiHeader filename={undefined} />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-8 max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{message}</p>
          <div className="flex justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Return to Main Page
            </Link>
            {createFilename && (
              <a
                href={`${REPO_URL}/new/main/app/routes/_wiki%2B?filename=${createFilename}.mdx`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                Create This Page
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
