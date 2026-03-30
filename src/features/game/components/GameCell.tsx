"use client";

import { Box, Text } from "@chakra-ui/react";
import StarIcon from "./StarIcon";
import type { EvaluatedCell } from "../types";

interface GameCellProps {
  cell: EvaluatedCell;
  row: number;
  col: number;
  onClick: (row: number, col: number) => void;
  isHint?: boolean;
  showSolution?: boolean;
  solutionStar?: boolean;
}

export default function GameCell({
  cell,
  row,
  col,
  onClick,
  isHint,
  showSolution,
  solutionStar,
}: GameCellProps) {
  const isAsteroid = cell.base === "asteroid";
  const isStar = cell.state === "star";
  const isMarker = cell.state === "marker";
  const showOverlayStar =
    showSolution &&
    solutionStar &&
    cell.base === "empty" &&
    cell.state !== "star";
  const showGlow = isStar;
  const hasConflict = cell.conflict;

  const background = isAsteroid
    ? "#2b2018"
    : showGlow
    ? "linear-gradient(135deg, rgba(255,210,148,0.32), rgba(255,154,72,0.16))"
    : "rgba(255,255,255,0.7)";

  const borderColor = hasConflict ? "#ff5c1f" : isHint ? "#ffb347" : "#d9cbbc";

  return (
    <Box
      as="button"
      aria-label={`Row ${row + 1}, Column ${col + 1}`}
      onClick={() => onClick(row, col)}
      cursor={isAsteroid ? "default" : "pointer"}
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderWidth="1px"
      borderStyle="solid"
      borderColor={borderColor}
      borderRadius="12px"
      background={background}
      position="relative"
      transition="transform 150ms ease, box-shadow 150ms ease"
      boxShadow={
        showGlow
          ? "0 0 20px rgba(255, 160, 88, 0.4)"
          : isHint
          ? "0 0 12px rgba(255, 179, 71, 0.5)"
          : "none"
      }
      aspectRatio="1 / 1"
      _hover={
        isAsteroid
          ? {}
          : {
              transform: "translateY(-1px)",
              boxShadow: "0 8px 18px rgba(43, 32, 24, 0.16)",
            }
      }
      _active={
        isAsteroid
          ? {}
          : {
              transform: "translateY(0)",
              boxShadow: "0 4px 10px rgba(43, 32, 24, 0.18)",
            }
      }
    >
      {isAsteroid && typeof cell.value === "number" ? (
        <Text color="dune.50" fontWeight="600" fontSize="lg">
          {cell.value}
        </Text>
      ) : null}
      {isAsteroid && typeof cell.value !== "number" ? (
        <Box width="10px" height="10px" borderRadius="999px" background="#433227" />
      ) : null}
      {isStar || showOverlayStar || isMarker ? (
        <Box position="absolute" inset="0" display="flex" alignItems="center" justifyContent="center">
          {isStar ? (
            <StarIcon
              size={22}
              color={hasConflict ? "#ff5c1f" : "#ffb347"}
              glow={hasConflict ? "rgba(255,92,31,0.6)" : "rgba(255,179,71,0.6)"}
            />
          ) : null}
          {!isStar && showOverlayStar ? (
            <StarIcon size={18} color="#ffb347" glow="rgba(255,179,71,0.3)" opacity={0.6} />
          ) : null}
          {isMarker ? (
            <Text fontSize="lg" color="#7e624c">
              x
            </Text>
          ) : null}
        </Box>
      ) : null}
    </Box>
  );
}
