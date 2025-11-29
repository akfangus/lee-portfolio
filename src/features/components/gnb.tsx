"use client";

import { useGlobalNavigation } from "@/hooks/useglobalnavigation";

export function GNB() {
  const { activeSection, navItems } = useGlobalNavigation();

  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-center border-b border-gray-200 bg-white/80 px-4 py-4 backdrop-blur-md transition-all dark:border-gray-800 dark:bg-black/80">
      <ul className="flex gap-8">
        {navItems.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`text-lg font-medium transition-colors ${
                activeSection === id
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
