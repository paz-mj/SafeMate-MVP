/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                'light-background': '#F5F7FA',
                'light-surface': '#FFFFFF',
                'dark-background': '#0F172A',
                'dark-surface': '#1E293B',
                'brand': '#3B82F6',
                'alert-green': '#10B981',
                'alert-yellow': '#F59E0B',
                'alert-red': '#EF4444',
            },
        },
    },
    plugins: [],
}