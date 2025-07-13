import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
	const getInitialTheme = () => {
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

	const [theme, setTheme] = useState(getInitialTheme);

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
		setTheme((previousTheme) => (previousTheme === "light" ? "dark" : "light"));

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
