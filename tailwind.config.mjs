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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        scrollLeft: {
          "0%": { transform: "translateX(150%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        scrollLeftMobile: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        scrollLeftDesktop: "scrollLeft 20s linear infinite",
        scrollLeftMobile: "scrollLeftMobile 20s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
