import { create } from "zustand";
import { createGridFromLevel, cycleCellState, updateCellState } from "./logic";
import { starterLevel } from "./levels";
import type { Cell } from "./types";

interface GameState {
  grid: Cell[][];
  puzzleNumber: number;
  hasShared: boolean;
  handleCellClick: (row: number, col: number) => void;
  reset: () => void;
  markShared: () => void;
}

const initialGrid = createGridFromLevel(starterLevel);

export const useGameStore = create<GameState>((set) => ({
  grid: initialGrid,
  puzzleNumber: 1,
  hasShared: false,
  handleCellClick: (row, col) =>
    set((state) => {
      const cell = state.grid[row][col];
      const nextState = cycleCellState(cell);
      return { grid: updateCellState(state.grid, row, col, nextState) };
    }),
  reset: () =>
    set({
      grid: createGridFromLevel(starterLevel),
      hasShared: false,
    }),
  markShared: () => set({ hasShared: true }),
}));
