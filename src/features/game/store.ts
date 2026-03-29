import { create } from "zustand";
import { createGridFromLevel, cycleCellState, updateCellState } from "./logic";
import { getDateForPuzzleIndex, getPuzzleIndexForDate, puzzles } from "./puzzles";
import type { Cell } from "./types";

interface GameState {
  grid: Cell[][];
  puzzleNumber: number;
  puzzleIndex: number;
  selectedDate: Date;
  hasShared: boolean;
  hintCooldown: number;
  hintCell: { row: number; col: number } | null;
  showSolution: boolean;
  solution: boolean[][];
  elapsedSeconds: number;
  isTimerRunning: boolean;
  handleCellClick: (row: number, col: number) => void;
  reset: () => void;
  markShared: () => void;
  requestHint: () => void;
  tickHint: () => void;
  toggleSolution: () => void;
  setDate: (date: Date) => void;
  tickTimer: () => void;
  stopTimer: () => void;
}

const today = new Date();
const todayIndex = getPuzzleIndexForDate(today);
const fallbackIndex = todayIndex ?? Math.max(puzzles.length - 1, 0);
const initialIndex = fallbackIndex;
const initialDate = getDateForPuzzleIndex(initialIndex);
const initialPuzzle = puzzles[initialIndex];
const initialGrid = createGridFromLevel(initialPuzzle.level);

export const useGameStore = create<GameState>((set) => ({
  grid: initialGrid,
  puzzleNumber: initialIndex + 1,
  puzzleIndex: initialIndex,
  selectedDate: initialDate,
  hasShared: false,
  hintCooldown: 0,
  hintCell: null,
  showSolution: false,
  solution: initialPuzzle.solution,
  elapsedSeconds: 0,
  isTimerRunning: true,
  handleCellClick: (row, col) =>
    set((state) => {
      const cell = state.grid[row][col];
      const nextState = cycleCellState(cell);
      const nextGrid = updateCellState(state.grid, row, col, nextState);
      const hintCleared =
        state.hintCell &&
        state.hintCell.row === row &&
        state.hintCell.col === col;

      return {
        grid: nextGrid,
        hintCell: hintCleared ? null : state.hintCell,
      };
    }),
  reset: () =>
    set((state) => {
      const puzzle = puzzles[state.puzzleIndex];
      return {
        grid: createGridFromLevel(puzzle.level),
        hasShared: false,
        hintCooldown: 0,
        hintCell: null,
        showSolution: false,
        solution: puzzle.solution,
        elapsedSeconds: state.elapsedSeconds,
        isTimerRunning: state.isTimerRunning,
      };
    }),
  markShared: () => set({ hasShared: true }),
  requestHint: () =>
    set((state) => {
      if (state.hintCooldown > 0) {
        return state;
      }

      const emptyCells: Array<{ row: number; col: number }> = [];
      state.grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell.base === "empty" && cell.state === "empty") {
            emptyCells.push({ row: rowIndex, col: colIndex });
          }
        });
      });

      if (emptyCells.length === 0) {
        return state;
      }

      const hintCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

      return {
        hintCooldown: 30,
        hintCell,
        grid: updateCellState(state.grid, hintCell.row, hintCell.col, "star"),
      };
    }),
  tickHint: () =>
    set((state) => {
      if (state.hintCooldown <= 0) {
        return state;
      }

      const nextCooldown = state.hintCooldown - 1;
      return { hintCooldown: Math.max(nextCooldown, 0) };
    }),
  toggleSolution: () => set((state) => ({ showSolution: !state.showSolution })),
  setDate: (date) =>
    set((state) => {
      const index = getPuzzleIndexForDate(date);
      if (index === null) {
        return state;
      }
      const puzzle = puzzles[index];
      return {
        selectedDate: date,
        puzzleIndex: index,
        puzzleNumber: index + 1,
        grid: createGridFromLevel(puzzle.level),
        solution: puzzle.solution,
        hasShared: false,
        hintCooldown: 0,
        hintCell: null,
        showSolution: false,
        elapsedSeconds: 0,
        isTimerRunning: true,
      };
    }),
  tickTimer: () =>
    set((state) => {
      if (!state.isTimerRunning) {
        return state;
      }
      return { elapsedSeconds: state.elapsedSeconds + 1 };
    }),
  stopTimer: () => set({ isTimerRunning: false }),
}));
