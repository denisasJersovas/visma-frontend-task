module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    container: {
      padding: {
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    colors: {
      white: "#FFFFFF",
      red: "#EF4444",
      blue: "#1040A8",
      green: "#15803d",
      gray: "#787878",
      black: "#000000",
      light: "#F0F0F0",
      "light-gray": "#e3e3e3",
      transparent: "transparent",
    },
    extend: {
      transitionProperty: {
        width: "width",
      },
    },
  },
};
