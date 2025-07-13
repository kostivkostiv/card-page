import ThemeToggleButton from "@/components/theme_toggle/ThemeToggleButton";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export function Header() {
  const linkStyles =
    'relative text-lg font-medium after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-yellow-900 after:transition-all after:duration-300 after:ease-in-out';

  return (
    <header className="bg-gray-100 dark:bg-gray-900 border-b flex">
      <div className="w-full max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8">
        <Link to="/">
          <h1 className="text-2xl font-bold">SomeShop.net</h1>
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="/" className={linkStyles}>
            {({ isActive }) => (
              <span
                className={cn({
                  "hover:text-yellow-900 transition-colors dark:hover:text-red-700 duration-300 hover:after:w-full":
                    !isActive,
                  "text-yellow-900 dark:text-red-700 after:w-full": isActive,
                })}
              >
                Home
              </span>
            )}
          </Link>

          <Link to="/my-cards" className={linkStyles}>
            {({ isActive }) => (
              <span
                className={cn({
                  "hover:text-yellow-900 transition-colors dark:hover:text-red-700 duration-300 hover:after:w-full":
                    !isActive,
                  "text-yellow-900 dark:text-red-700 after:w-full": isActive,
                })}
              >
                Credit Cards
              </span>
            )}
          </Link>
          <ThemeToggleButton />
        </nav>
      </div>
    </header>
  );
}