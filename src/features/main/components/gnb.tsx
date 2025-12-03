"use client";

import { useGlobalNavigation } from "@/hooks/useglobalnavigation";

export function GNB() {
  const { activeSection, navItems, isSticky } = useGlobalNavigation();

  return (
    <div className="sticky top-0 z-50 flex w-full justify-center pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-center transition-all duration-300 ease-in-out backdrop-blur-md ${
          isSticky
            ? "mt-4 w-fit rounded-full  bg-white/80 px-8 py-2 shadow-lg dark:border-gray-800 dark:bg-black/80"
            : "w-full  bg-white/80 px-4 py-4 dark:border-gray-800 dark:bg-black/80"
        }`}
      >
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
    </div>
  );
}
