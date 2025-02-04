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
				navy: {
					50: "#DDEBFD",
					100: "#C1D9FB",
					200: "#7DB0F7",
					300: "#3F8AF3",
					400: "#0E64DD",
					500: "#0A489E",
					600: "#08397D",
					700: "#062C60",
					800: "#041C3E",
					900: "#020F22",
				},
				bluegrey: {
					50: "#eceff1",
					100: "#cfd8dc",
					200: "#b0bec5",
					300: "#90a4ae",
					400: "#78909c",
					500: "#607d8b",
					600: "#546e7a",
					700: "#455a64",
					800: "#37474f",
					900: "#263238",
				}
			}
		},
	},
	plugins: [],
}
