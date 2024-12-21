/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    
      noScrollbar: {
        '&::-webkit-scrollbar': {
          display: 'none', // For Chrome, Safari, and Opera
        },
        '-ms-overflow-style': 'none', // For IE and Edge
        'scrollbar-width': 'none', // For Firefox
      },  // Add custom styles for hiding the scrollbar
    },
  },
  plugins: [],
};
