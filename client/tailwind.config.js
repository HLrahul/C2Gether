import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        featureCard: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(0px, 0px) scale(1.05)",
          },
          "66%": {
            transform: "translate(0px, 0px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, 0px) scale(1.3)",
          },
          "66%": {
            transform: "translate(-20px, 0px) scale(0.5)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        blobTwo: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(-30px, 0px) scale(1.2)",
          },
          "66%": {
            transform: "translate(20px, 0px) scale(0.6)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "blob": "blob 6s infinite",
        "blobTwo": "blobTwo 6s infinite",
        "featureCard": "featureCard 7s infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("tailwindcss-animate"),
    nextui({
      themes: {
        light: {
          layout: {},
          colors: {},
        },
        dark: {
          layout: {},
          colors: {},
        },

        "teal-light": {
          extend: "light",
          colors: {
            background: "#ffffff",
            foreground: "#00140d",
            primary: {
              100: "#CDFCD7",
              200: "#9DF9BA",
              300: "#6AEDA1",
              400: "#44DC93",
              500: "#10C680",
              600: "#0BAA7D",
              700: "#088E75",
              800: "#057269",
              900: "#035D5F",
              DEFAULT: "#10C680",
              foreground: "#00140d",
            },
            focus: "#0fd48f",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },

        "teal-dark": {
          extend: "dark",
          colors: {
            background: "#010a07",
            foreground: "#ffffff",
            primary: {
              100: "#CDFCD7",
              200: "#9DF9BA",
              300: "#6AEDA1",
              400: "#44DC93",
              500: "#10C680",
              600: "#0BAA7D",
              700: "#088E75",
              800: "#057269",
              900: "#035D5F",
              DEFAULT: "#10C680",
              foreground: "#ffffff",
            },
            focus: "#0fd48f",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
      },
    }),
  ],
};
