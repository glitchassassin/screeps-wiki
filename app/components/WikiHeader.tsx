import { GitHubEditLink } from "./GithubEditLink";

export function WikiHeader({ filename }: { filename?: string }) {
  return (
    <header className="bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a
          href="/"
          className="text-xl font-semibold text-gray-800 dark:text-gray-100 pt-2"
        >
          <img
            src="https://screeps.com/a/logotype.svg"
            alt="Screeps Wiki"
            className="h-8"
          />
        </a>
        {filename && (
          <div className="flex items-center space-x-4">
            <GitHubEditLink filename={filename} />
          </div>
        )}
      </div>
    </header>
  );
}
