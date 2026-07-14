/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        graphite: "#111827",
        navy: "#0B1F3A",
        steel: "#334155",
        copper: "#B88653",
        "copper-light": "#D7B37A",
        "copper-dark": "#8A5A2E",
      },
      fontFamily: {
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 16px 42px rgba(15, 23, 42, 0.07)",
        premium: "0 24px 70px rgba(15, 23, 42, 0.14)",
      },
      keyframes: {
        loadingBar: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(220%)" },
        },
      },
      animation: {
        "loading-bar": "loadingBar 1.1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
