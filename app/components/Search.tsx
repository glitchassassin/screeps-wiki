export function Search({
  ...props
}: React.FormHTMLAttributes<HTMLFormElement>) {
  return (
    <form
      action={(data) => {
        const query = data.get("q");
        window.open(
          `https://www.google.com/search?q=${encodeURIComponent(
            "site:wiki.screepspl.us " + query
          )}`,
          "_blank"
        );
      }}
      {...props}
      className={"relative md:max-w-[16rem] " + (props.className ?? "")}
    >
      <input
        type="search"
        name="q"
        placeholder="Search wiki..."
        aria-label="Search wiki"
        className="w-full pl-3 pr-10 py-1.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 placeholder-gray-600 dark:placeholder-gray-400 border border-gray-400 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 focus:outline-none"
        aria-label="Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
}
