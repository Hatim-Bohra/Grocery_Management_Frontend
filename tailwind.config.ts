import type { Config } from "tailwindcss";

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "hsl(var(--primary))",
                "primary-dark": "hsl(var(--primary-dark))",
                "primary-light": "hsl(var(--primary-light))",
                secondary: "hsl(var(--secondary))",
                accent: "hsl(var(--accent))",
                background: "hsl(var(--background))",
                surface: "hsl(var(--surface))",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
    darkMode: 'class',
} satisfies Config;
