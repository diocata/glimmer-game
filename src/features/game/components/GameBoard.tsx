"use client";

import { Grid } from "@chakra-ui/react";
import GameCell from "./GameCell";
import type { EvaluatedCell } from "../types";

interface GameBoardProps {
  grid: EvaluatedCell[][];
  onCellClick: (row: number, col: number) => void;
  hintCell?: { row: number; col: number } | null;
  showSolution?: boolean;
  solution?: boolean[][];
}

export default function GameBoard({
  grid,
  onCellClick,
  hintCell,
  showSolution,
  solution,
}: GameBoardProps) {
  const size = grid.length;
  return (
    <Grid
      templateColumns={`repeat(${size}, minmax(36px, 1fr))`}
      gap={{ base: "8px", md: "12px" }}
      width="100%"
      alignItems="stretch"
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <GameCell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            row={rowIndex}
            col={colIndex}
            onClick={onCellClick}
            isHint={
              hintCell ? hintCell.row === rowIndex && hintCell.col === colIndex : false
            }
            showSolution={showSolution}
            solutionStar={solution ? solution[rowIndex]?.[colIndex] : false}
          />
        ))
      )}
    </Grid>
  );
}
