/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F7F0E6",
        ivory: "#FFF9F0",
        sage: "#7B947A",
        "sage-deep": "#4B674F",
        coral: "#C9786A",
        gold: "#C6A96D",
        graphite: "#2B2520",
        cocoa: "#4A342B",
        mist: "#E9E0D2",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        premium: "0 28px 90px rgba(43, 37, 32, 0.14)",
        soft: "0 18px 50px rgba(75, 103, 79, 0.12)",
      },
      opacity: {
        8: "0.08",
        12: "0.12",
        14: "0.14",
        16: "0.16",
        18: "0.18",
        22: "0.22",
        24: "0.24",
        28: "0.28",
        32: "0.32",
        38: "0.38",
        56: "0.56",
        62: "0.62",
        72: "0.72",
        74: "0.74",
        76: "0.76",
        78: "0.78",
        88: "0.88",
      },
      keyframes: {
        floatSoft: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(0, -14px, 0) scale(1.02)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-140%)" },
          "100%": { transform: "translateX(140%)" },
        },
      },
      animation: {
        "float-soft": "floatSoft 8s ease-in-out infinite",
        shimmer: "shimmer 1.1s cubic-bezier(.16,1,.3,1)",
      },
    },
  },
  plugins: [],
};
