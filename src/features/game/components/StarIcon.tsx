"use client";

import { chakra } from "@chakra-ui/react";

interface StarIconProps {
  size?: string | number;
  color?: string;
  glow?: string;
  opacity?: number;
}

export default function StarIcon({ size = 18, color = "#ffb347", glow, opacity }: StarIconProps) {
  return (
    <chakra.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      opacity={opacity}
      filter={glow ? `drop-shadow(0 0 6px ${glow})` : undefined}
    >
      <path
        d="M12 2.5l2.6 6.1 6.4.5-4.9 4.2 1.5 6.3L12 16.8 6.4 19.6 7.9 13.3 3 9.1l6.4-.5L12 2.5z"
        fill={color}
      />
    </chakra.svg>
  );
}
