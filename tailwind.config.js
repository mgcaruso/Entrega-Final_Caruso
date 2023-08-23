/* eslint-disable no-undef */
/** @type {import("tailwindcss").Config} */


export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        "primary": "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        "primary-inverted": "var(--primary-inverted)",
        "primary-inverted-hover": "var(--primary-inverted-hover)",
        "neutral": "var(--neutral)",
        "neutral-lighter": "var(--neutral-lighter)",
        "neutral-ultra-light": "var(--neutral-ultra-light)",
        "ultra-light": "var(--ultra-light)",
        "btn-fill": "var(--btn-fill)",
        "btn-fill-hover": "var(--btn-fill-hover)",
        "key-color": "var(--key-color)",
        "key-color-hover": "var(--key-color-hover)"
      }
    },
    fontFamily: {
      body: ["var(--body)"],
      heading: ["var(--branding)"]
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

