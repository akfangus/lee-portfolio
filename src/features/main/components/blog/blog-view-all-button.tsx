import Link from "next/link";

export function BlogViewAllButton(): React.ReactElement {
  return (
    <div className="mt-12 flex justify-center">
      <Link
        href="/blog"
        className="group flex items-center gap-2 rounded-full bg-stone-900 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-stone-800 hover:shadow-xl dark:bg-white dark:text-stone-900 dark:hover:bg-stone-100"
      >
        블로그 전체보기
        <svg
          className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </Link>
    </div>
  );
}

