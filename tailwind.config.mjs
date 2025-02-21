/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		  animation: {
			"scroll-left": "scroll-left 40s linear infinite",
		  },
		  keyframes: {
			"scroll-left": {
			  "0%": { transform: "translateX(100%)" },
			  "100%": { transform: "translateX(-100%)" },
			},
		  },
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
