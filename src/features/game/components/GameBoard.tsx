"use client";

import { Grid } from "@chakra-ui/react";
import GameCell from "./GameCell";
import type { EvaluatedCell } from "../types";

interface GameBoardProps {
  grid: EvaluatedCell[][];
  onCellClick: (row: number, col: number) => void;
}

export default function GameBoard({ grid, onCellClick }: GameBoardProps) {
  const size = grid.length;
  return (
    <Grid
      templateColumns={`repeat(${size}, minmax(36px, 1fr))`}
      gap={{ base: "8px", md: "12px" }}
      width="100%"
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <GameCell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            row={rowIndex}
            col={colIndex}
            onClick={onCellClick}
          />
        ))
      )}
    </Grid>
  );
}
