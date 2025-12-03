import Link from "next/link";

export function MainHeader() {
  return (
    <header className="absolute top-0 z-50 flex w-full justify-end px-8 py-6 pointer-events-none">
      <nav className="pointer-events-auto flex items-center transition-all duration-300 ease-in-out backdrop-blur-md">
        <ul className="flex gap-8 text-sm font-medium text-stone-600 dark:text-stone-300">
          <li>
            <button className="hover:text-stone-900 dark:hover:text-white transition-colors">
              <Link href="/">About</Link>
            </button>
          </li>
          <li>
            <button className="hover:text-stone-900 dark:hover:text-white transition-colors">
              <Link href="/blog">Blog</Link>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
