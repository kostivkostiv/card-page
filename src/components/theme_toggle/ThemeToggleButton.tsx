import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from 'lucide-react';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-1 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200
                 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        
        <Moon size={20} />
      ) : (
        <Sun size={20}/>
      )}
    </button>
  );
};

export default ThemeToggleButton;