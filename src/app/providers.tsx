"use client";

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: "var(--font-instrument-sans)" },
        body: { value: "var(--font-instrument-sans)" },
        mono: { value: "var(--font-dm-mono)" },
      },
      colors: {
        dune: {
          50: { value: "#f6f3ef" },
          100: { value: "#e8e1d8" },
          200: { value: "#d9cbbc" },
          300: { value: "#c7b29b" },
          400: { value: "#b89c7f" },
          500: { value: "#9f7f63" },
          600: { value: "#7e624c" },
          700: { value: "#614a39" },
          800: { value: "#433227" },
          900: { value: "#2b2018" },
        },
        ember: {
          50: { value: "#ffe6d9" },
          100: { value: "#ffc8ad" },
          200: { value: "#ffab7f" },
          300: { value: "#ff8e57" },
          400: { value: "#ff7438" },
          500: { value: "#ff5c1f" },
          600: { value: "#e14613" },
          700: { value: "#b5350d" },
          800: { value: "#88260a" },
          900: { value: "#5b1806" },
        },
      },
    },
  },
});

export default function ChakraProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}
