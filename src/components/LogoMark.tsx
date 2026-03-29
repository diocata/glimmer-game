"use client";

import { chakra } from "@chakra-ui/react";

interface LogoMarkProps {
  size?: string | number;
  opacity?: number;
}

export default function LogoMark({ size = 36, opacity = 0.5 }: LogoMarkProps) {
  return (
    <chakra.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      opacity={opacity}
    >
      <rect width="64" height="64" rx="18" fill="#2B2018" />
      <path
        d="M32 12L36.8 25.2L50 30L36.8 34.8L32 48L27.2 34.8L14 30L27.2 25.2L32 12Z"
        fill="#FFB347"
      />
      <circle cx="47" cy="17" r="3" fill="#FF7438" />
      <circle cx="18" cy="46" r="2" fill="#FFC8AD" />
    </chakra.svg>
  );
}
