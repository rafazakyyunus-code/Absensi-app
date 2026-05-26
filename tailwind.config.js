import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.js',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },

            keyframes: {
                float: {
                    '0%,100%': {
                        transform: 'translateY(0px)',
                    },

                    '50%': {
                        transform: 'translateY(-20px)',
                    },
                },

                shine: {
                    '0%': {
                        transform: 'translateX(-120%)',
                    },

                    '100%': {
                        transform: 'translateX(120%)',
                    },
                },
            },

            animation: {
                float: 'float 6s ease-in-out infinite',
                shine: 'shine 2s linear infinite',
            },
        },
    },

    plugins: [forms],
};