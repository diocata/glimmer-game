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
  solutionCooldown: number;
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
  tickSolutionCooldown: () => void;
  hydrateProgress: (progress: PersistedProgress) => void;
  setDate: (date: Date) => void;
  tickTimer: () => void;
  stopTimer: () => void;
  startTimer: () => void;
}

interface PersistedProgress {
  grid: Cell[][];
  elapsedSeconds: number;
  hintCooldown: number;
  solutionCooldown: number;
  hintCell: { row: number; col: number } | null;
  showSolution: boolean;
  isTimerRunning: boolean;
}

const HINT_COOLDOWN_SECONDS = 20;
const SOLUTION_COOLDOWN_SECONDS = 60;

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
  solutionCooldown: SOLUTION_COOLDOWN_SECONDS,
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
        solutionCooldown: state.solutionCooldown,
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

      const suggestedCells: Array<{ row: number; col: number }> = [];
      state.grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          const shouldBeStar = state.solution[rowIndex]?.[colIndex] === true;
          if (cell.base === "empty" && shouldBeStar && cell.state !== "star") {
            suggestedCells.push({ row: rowIndex, col: colIndex });
          }
        });
      });

      if (suggestedCells.length === 0) {
        return state;
      }

      const hintCell = suggestedCells[Math.floor(Math.random() * suggestedCells.length)];

      return {
        hintCooldown: HINT_COOLDOWN_SECONDS,
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
  toggleSolution: () =>
    set((state) => {
      if (state.solutionCooldown > 0) {
        return state;
      }

      return { showSolution: !state.showSolution };
    }),
  tickSolutionCooldown: () =>
    set((state) => {
      if (state.solutionCooldown <= 0) {
        return state;
      }

      return { solutionCooldown: Math.max(state.solutionCooldown - 1, 0) };
    }),
  hydrateProgress: (progress) =>
    set((state) => {
      const sameShape =
        progress.grid.length === state.grid.length &&
        progress.grid.every(
          (row, rowIndex) => row.length === state.grid[rowIndex]?.length
        );

      if (!sameShape) {
        return state;
      }

      return {
        grid: progress.grid,
        elapsedSeconds: Math.max(0, Math.floor(progress.elapsedSeconds)),
        hintCooldown: Math.max(0, Math.floor(progress.hintCooldown)),
        solutionCooldown: Math.max(0, Math.floor(progress.solutionCooldown)),
        hintCell: progress.hintCell,
        showSolution: progress.showSolution,
        isTimerRunning: progress.isTimerRunning,
      };
    }),
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
        solutionCooldown: SOLUTION_COOLDOWN_SECONDS,
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
  startTimer: () => set({ isTimerRunning: true }),
}));
