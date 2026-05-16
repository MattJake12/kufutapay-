/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          100: "rgba(255, 255, 255, 0.1)", // Vidro claro
          200: "rgba(255, 255, 255, 0.2)", // Vidro médio
          300: "rgba(255, 255, 255, 0.3)", // Vidro forte
          dark: "rgba(15, 23, 42, 0.6)",   // Vidro escuro
        },
        brand: {
          primary: "#D9480F",   // Laranja Queimado (Marca Principal)
          secondary: "#FA5252", // Vermelho Alaranjado
          accent: "#FF922B",    // Laranja Vibrante (Destaques)
          light: "#F8F9FA",     // Cinza Ultra-claro (Fundo App)
          text: "#212529",      // Texto principal escuro
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      },
      animation: {
        'blob': 'blob 7s infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
}