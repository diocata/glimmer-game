import type { LevelDefinition } from "./types";

export const starterLevel: LevelDefinition = [
  ["0", ".", "#", ".", ".", ".", "."],
  ["#", ".", "2", ".", "1", "0", "."],
  [".", ".", ".", ".", ".", ".", "."],
  [".", ".", "1", ".", ".", ".", "1"],
  [".", "2", ".", ".", ".", "2", "."],
  [".", ".", ".", ".", "2", ".", "."],
  [".", ".", ".", ".", ".", ".", "."],
];

export const starterSolution: boolean[][] = [
  [false, false, false, false, false, false, true],
  [false, true, false, true, false, false, false],
  [true, false, false, false, false, false, false],
  [false, false, false, false, true, false, false],
  [false, false, true, false, false, false, true],
  [false, true, false, false, false, true, false],
  [false, false, false, false, true, false, false],
];
