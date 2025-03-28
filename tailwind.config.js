const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./app/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter var", ...defaultTheme.fontFamily.sans],
			},
			colors: {
				sky: {
					150: "#ecfafe"
				},
				gray: {
					350: "#afb9c1",
					450: "#9ea8b0"
				},
				dark: {
					bg: "#28292b",
					"text-correct": "#e3e6ea",
					text: "#54585c",
					"text-highlight": "#6b7075",
					highlight: "#dfdacd",
					"highlight-highlight": "#b0aba2",
				}
			}
		},
	},
	plugins: [],
	darkMode: "class",
}
