/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: theme => ({
       'bg-temp-1': "url('../public/assets/background-images/bg1.webp')", 
       'bg-temp-2': "url('../public/assets/background-images/bg2.webp')", 
       'logo-1': "url('../public/assets/logos/logo1.png')", 
      })
    },
  },
  plugins: [],
};
