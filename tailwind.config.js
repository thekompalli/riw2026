/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['"Playfair Display"', 'serif'],
            },
            colors: {
                brand: {
                    // Navy Blue palette based on #1C328E
                    50: '#eef0f9',
                    100: '#dce1f3',
                    200: '#b9c3e7',
                    300: '#96a5db',
                    400: '#7387cf',
                    500: '#5069c3',
                    600: '#3d52a8',
                    700: '#2f408d',
                    800: '#1C328E', // Official Navy - main color
                    900: '#162865',
                    950: '#0d1a3c',
                },
                accent: {
                    // Red palette based on #D02327
                    50: '#fef2f2',
                    100: '#fde5e6',
                    200: '#fbcbcd',
                    300: '#f7a1a4',
                    400: '#f17176',
                    500: '#e5464b',
                    600: '#D02327', // Official Red - main color
                    700: '#b01d20',
                    800: '#901a1d',
                    900: '#771a1d',
                    950: '#410a0b',
                },
                gold: {
                    // Yellow/Gold palette based on #FCCE08
                    50: '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fdd74d',
                    400: '#FCCE08', // Official Gold - main color
                    500: '#eab308',
                    600: '#ca8a04',
                    700: '#a16207',
                    800: '#854d0e',
                    900: '#713f12',
                    950: '#422006',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
            animation: {
                'spin-slow': 'spin 12s linear infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
}
