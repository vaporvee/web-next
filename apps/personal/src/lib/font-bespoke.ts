import localFont from "next/font/local";

export const bespokeSans = localFont({
  src: [
    {
      path: "../styles/fonts/BespokeSans-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../styles/fonts/BespokeSans-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../styles/fonts/BespokeSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../styles/fonts/BespokeSans-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../styles/fonts/BespokeSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../styles/fonts/BespokeSans-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../styles/fonts/BespokeSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../styles/fonts/BespokeSans-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../styles/fonts/BespokeSans-Extrabold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../styles/fonts/BespokeSans-ExtraboldItalic.woff2",
      weight: "800",
      style: "italic",
    },
    {
      path: "../styles/fonts/BespokeSans-Variable.woff2",
      weight: "300 800",
      style: "normal",
    },
    {
      path: "../styles/fonts/BespokeSans-VariableItalic.woff2",
      weight: "300 800",
      style: "italic",
    },
  ],
  variable: "--font-bespoke-sans",
  display: "swap",
});