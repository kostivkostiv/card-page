import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";

interface ThemeContextType {
	theme: string;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};

interface ThemeProviderProps {
	children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const getInitialTheme = (): string => {
		if (typeof window !== "undefined" && window.localStorage) {
			const storedTheme = window.localStorage.getItem("theme");
			if (storedTheme) {
				return storedTheme;
			}
			if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
				return "dark";
			}
		}
		return "light";
	};

	const [theme, setTheme] = useState<string>(getInitialTheme);

	useEffect(() => {
		const html = document.documentElement;
		if (theme === "dark") {
			html.classList.add("dark");
		} else {
			html.classList.remove("dark");
		}

		if (typeof window !== "undefined" && window.localStorage) {
			window.localStorage.setItem("theme", theme);
		}
	}, [theme]);

	const toggleTheme = () =>
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
