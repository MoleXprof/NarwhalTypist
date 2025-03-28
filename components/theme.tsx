'use client'

import { useTheme } from "next-themes";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

const Theme = () => {
    const { resolvedTheme, setTheme } = useTheme();

    return (
        <button
            aria-label="Toggle dark mode"
            type="button"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center"
        >
            {resolvedTheme === "dark" ? (
                <MdLightMode className="h-6 w-6 text-sky-200 hover:text-sky-300 dark:text-dark-text dark:hover:text-dark-text-highlight" />
            ) : (
                <MdDarkMode className="h-6 w-6 text-gray-400 hover:text-gray-500 dark:text-dark-text dark:hover:text-dark-text-highlight" />
            )}
        </button>
    );
};

export default Theme;