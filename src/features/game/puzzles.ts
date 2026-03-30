import type { LevelCell, LevelDefinition } from "./types";

export const PUZZLE_START_DATE = new Date("2026-03-27T00:00:00Z");
const DAY_MS = 24 * 60 * 60 * 1000;

export interface PuzzleDefinition {
  level: LevelDefinition;
  solution: boolean[][];
}

export type PuzzleDifficulty = "easy" | "medium";

const EASY_PUZZLE_COUNT = 15;
const EASY_PUZZLE_SIZE = 5;
const CARDINAL_DIRECTIONS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
] as const;
const ADJACENCY_CLUES: LevelCell[] = ["0", "1", "2", "3", "4"];
const EASY_CROP_CONFIG = [
  { baseIndex: 0, rowOffset: 0, colOffset: 0 },
  { baseIndex: 1, rowOffset: 1, colOffset: 0 },
  { baseIndex: 2, rowOffset: 0, colOffset: 1 },
  { baseIndex: 3, rowOffset: 1, colOffset: 0 },
  { baseIndex: 4, rowOffset: 0, colOffset: 0 },
  { baseIndex: 5, rowOffset: 1, colOffset: 0 },
  { baseIndex: 7, rowOffset: 1, colOffset: 1 },
  { baseIndex: 8, rowOffset: 1, colOffset: 1 },
  { baseIndex: 9, rowOffset: 0, colOffset: 0 },
  { baseIndex: 10, rowOffset: 0, colOffset: 1 },
  { baseIndex: 11, rowOffset: 1, colOffset: 0 },
  { baseIndex: 12, rowOffset: 0, colOffset: 0 },
  { baseIndex: 13, rowOffset: 0, colOffset: 0 },
  { baseIndex: 14, rowOffset: 0, colOffset: 0 },
  { baseIndex: 1, rowOffset: 1, colOffset: 1 },
] as const;

const basePuzzles: PuzzleDefinition[] = [
  {"level":[[".","1",".",".",".",".","."],["1",".",".",".","2",".","1"],[".",".",".",".",".",".","."],[".",".",".",".","2",".","0"],["2","0",".",".",".","1","."],[".","2",".","0","2",".","."],["#",".","1","#",".",".","."]],"solution":[[true,false,false,true,false,false,false],[false,false,true,false,false,true,false],[false,false,false,false,true,false,false],[true,false,false,false,false,false,false],[false,false,false,false,true,false,false],[true,false,false,false,false,false,true],[false,true,false,false,true,false,false]]},
  {"level":[["0","#",".",".","0",".","."],[".",".",".",".","3",".","."],[".",".",".","2",".",".","0"],[".",".",".",".","1","0","."],["1","0",".",".",".","1","."],["1","1",".",".",".",".","."],[".",".",".",".",".",".","."]],"solution":[[false,false,false,false,false,false,true],[false,false,false,true,false,true,false],[false,true,false,false,true,false,false],[true,false,false,false,false,false,false],[false,false,false,true,false,false,true],[false,false,true,false,false,false,false],[true,false,false,false,false,false,false]]},
  {"level":[["#",".",".","0","1",".","1"],["1","#",".",".","1",".","."],[".",".","#","2",".",".","."],["2",".","2",".",".",".","."],[".",".","0","1",".",".","."],[".",".",".",".",".","0","."],[".","1",".",".",".",".","."]],"solution":[[false,true,false,false,false,true,false],[false,false,true,false,false,false,false],[true,false,false,false,true,false,false],[false,true,false,true,false,false,false],[false,false,false,false,false,false,true],[true,false,false,false,false,false,false],[false,false,true,false,false,false,false]]},
  {"level":[[".",".",".",".",".",".","."],["1",".","1",".",".",".","0"],[".",".",".",".",".",".","."],[".","#","1",".",".",".","."],["2",".",".",".",".",".","."],[".",".","1",".",".",".","."],[".",".","1","#","2",".","."]],"solution":[[true,false,false,false,false,false,false],[false,false,false,true,false,false,false],[false,true,false,false,false,false,false],[true,false,false,false,false,false,true],[false,false,true,false,false,false,false],[true,false,false,false,true,false,false],[false,true,false,false,false,true,false]]},
  {"level":[["0","2",".",".",".",".","."],[".",".",".",".",".","1","."],[".",".","#",".",".","#","."],["1","1",".","4",".",".","."],["0",".",".",".",".",".","."],[".",".",".",".",".",".","."],[".",".","1",".","0",".","."]],"solution":[[false,false,true,false,false,false,false],[false,true,false,false,false,false,true],[true,false,false,true,false,false,false],[false,false,true,false,true,false,false],[false,false,false,true,false,false,false],[false,false,false,false,false,true,false],[false,true,false,false,false,false,false]]},
  {"level":[["1","#","#","0",".",".","."],[".","1",".",".",".","#","2"],[".",".",".",".",".","1","."],["1",".","2",".",".",".","."],[".",".",".","#",".","2","."],[".",".",".","0",".",".","."],[".",".",".",".",".",".","."]],"solution":[[false,false,false,false,false,false,true],[true,false,false,false,false,false,false],[false,false,true,false,false,false,true],[false,false,false,true,false,false,false],[true,false,false,false,true,false,false],[false,true,false,false,false,true,false],[false,false,true,false,false,false,false]]},
  {"level":[[".","2","#",".",".",".","1"],[".",".",".","1",".",".","1"],["0","3",".",".","#",".","."],[".",".","3",".",".","#","1"],[".",".",".",".",".",".","."],["2",".",".",".",".",".","."],[".",".","0",".",".","1","1"]],"solution":[[true,false,false,false,false,true,false],[false,true,false,false,true,false,false],[false,false,true,false,false,false,true],[false,true,false,true,false,false,false],[true,false,false,false,false,false,false],[false,false,false,false,false,false,true],[true,false,false,false,true,false,false]]},
  {"level":[[".","2",".",".",".","1","."],[".",".",".",".",".",".","."],[".",".","0","0",".",".","1"],["0","0",".","2",".",".","."],["0","#",".",".",".","#","#"],[".",".",".","2",".",".","1"],["#",".",".",".",".",".","."]],"solution":[[true,false,false,true,false,false,true],[false,true,false,false,false,false,false],[false,false,false,false,false,true,false],[false,false,false,false,true,false,false],[false,false,false,true,false,false,false],[false,false,true,false,false,true,false],[false,true,false,false,false,false,false]]},
  {"level":[[".",".","1",".",".",".","."],[".",".",".","#",".",".","1"],[".","1",".","2",".","2","0"],["0",".",".",".","2",".","0"],["0","#",".",".",".",".","."],[".",".",".",".",".",".","."],[".","1",".",".",".","2","."]],"solution":[[true,false,false,true,false,false,false],[false,true,false,false,false,true,false],[false,false,false,false,true,false,false],[false,false,false,true,false,false,false],[false,false,false,false,false,true,false],[false,false,true,false,false,false,false],[true,false,false,false,true,false,true]]},
  {"level":[[".",".",".",".",".",".","."],[".","#",".","2","1",".","2"],[".",".","2","#","0",".","."],[".",".",".",".","#",".","."],[".",".","1","1",".",".","0"],[".",".",".",".",".","#","."],[".","0",".","0","0",".","."]],"solution":[[false,false,false,true,false,false,false],[false,false,true,false,false,true,false],[false,true,false,false,false,false,true],[true,false,false,false,false,false,false],[false,false,false,false,true,false,false],[false,false,true,false,false,false,false],[false,false,false,false,false,false,true]]},
  {"level":[[".",".",".",".",".","1","#"],[".",".","1","0",".",".","2"],[".",".","#",".",".",".","."],[".","2",".",".",".","1","."],[".",".","2",".",".",".","1"],[".","3",".",".",".",".","."],[".",".","#",".",".","0","1"]],"solution":[[false,false,true,false,false,false,false],[false,false,false,false,false,true,false],[false,true,false,false,false,false,true],[false,false,false,false,true,false,false],[false,true,false,true,false,false,false],[true,false,false,false,false,false,true],[false,true,false,false,false,false,false]]},
  {"level":[["0","0",".",".",".","1","1"],[".",".",".",".","1",".","."],[".","0",".",".",".",".","."],[".",".",".",".",".",".","."],[".",".","1",".",".",".","#"],[".","1",".",".",".",".","."],["0","#",".","1","2",".","."]],"solution":[[false,false,false,false,true,false,false],[false,false,true,false,false,false,true],[false,false,false,true,false,false,false],[true,false,false,false,false,false,false],[false,true,false,false,false,false,false],[false,false,false,false,true,false,false],[false,false,true,false,false,true,false]]},
  {"level":[["2",".","1",".",".",".","."],[".",".",".",".",".",".","."],["1",".",".",".",".",".","."],[".",".",".","4",".",".","."],[".",".",".",".","3","1","."],[".",".",".","#",".",".","#"],["1",".",".",".",".",".","1"]],"solution":[[false,true,false,false,false,true,false],[true,false,false,false,false,false,false],[false,false,false,true,false,false,false],[false,false,true,false,true,false,false],[false,false,false,true,false,false,true],[true,false,false,false,true,false,false],[false,false,false,false,false,true,false]]},
  {"level":[[".","1",".",".",".",".","."],[".","0",".","1",".","2","."],[".",".",".",".",".",".","1"],[".",".",".",".",".","1","."],["1","#",".","1",".",".","."],[".",".",".","0","1",".","."],["2",".","1","1",".",".","1"]],"solution":[[false,false,true,false,false,false,false],[false,false,false,false,true,false,true],[true,false,false,false,false,false,false],[false,false,false,true,false,false,false],[false,false,false,false,false,true,false],[true,false,false,false,false,false,true],[false,true,false,false,true,false,false]]},
  {"level":[[".",".",".","3",".",".","0"],[".",".",".",".","4",".","."],[".",".","0","3",".",".","."],[".","0","2",".",".",".","."],[".","2",".",".","0","0","."],[".",".",".",".",".","#","."],[".","#",".",".",".","1","#"]],"solution":[[false,false,true,false,true,false,false],[false,false,false,true,false,true,false],[true,false,false,false,true,false,false],[false,false,false,true,false,false,false],[false,false,true,false,false,false,false],[false,true,false,false,false,false,true],[false,false,false,false,true,false,false]]},
  {"level":[[".",".","2",".",".","0","."],[".",".",".",".","0",".","."],["1",".","3",".",".",".","."],[".",".",".",".",".","1","#"],[".",".",".",".",".",".","."],[".","1","#","#",".",".","."],[".","1",".","1","2",".","."]],"solution":[[true,false,false,true,false,false,false],[false,false,true,false,false,false,true],[false,true,false,false,false,true,false],[false,false,true,false,false,false,false],[false,false,false,false,false,false,true],[true,false,false,false,true,false,false],[false,false,true,false,false,true,false]]},
  {"level":[["1",".",".","1",".",".","."],["#",".",".",".",".","2","."],[".",".",".",".",".",".","."],[".","1",".",".",".","1","."],[".","1",".","2",".","2","."],[".",".",".",".",".","1","."],[".",".","1",".",".",".","."]],"solution":[[false,true,false,false,false,true,false],[false,false,false,true,false,false,false],[false,false,false,false,false,true,false],[false,false,true,false,false,false,false],[true,false,false,false,true,false,true],[false,false,false,true,false,false,false],[false,true,false,false,false,true,false]]},
  {"level":[[".","1",".",".",".",".","."],["#",".",".","1",".",".","."],[".",".",".",".",".","1","."],[".",".","3",".","1","0","."],["2",".",".",".",".",".","."],[".",".",".",".","1",".","."],[".",".","1",".",".",".","1"]],"solution":[[true,false,false,true,false,false,false],[false,false,false,false,false,true,false],[false,false,true,false,false,false,false],[true,false,false,true,false,false,false],[false,false,true,false,false,false,false],[true,false,false,false,false,false,true],[false,true,false,false,true,false,false]]},
  {"level":[[".","0","#",".",".","#","0"],[".",".",".","0","#",".","#"],[".",".",".",".",".",".","#"],[".",".",".","3",".",".","."],[".",".","3",".",".","1","."],["1",".",".",".",".",".","1"],[".",".","1",".",".",".","."]],"solution":[[false,false,false,false,true,false,false],[true,false,false,false,false,true,false],[false,true,false,false,false,false,false],[false,false,true,false,true,false,false],[false,false,false,true,false,false,true],[false,false,true,false,false,false,false],[true,false,false,false,false,true,false]]},
  {"level":[[".",".",".",".","2",".","."],["3",".",".",".","0",".","."],[".",".",".",".",".",".","."],["#",".","0",".",".",".","#"],["#","0",".",".","1",".","1"],[".",".",".",".",".",".","."],[".",".",".",".",".",".","."]],"solution":[[false,false,true,false,false,false,true],[false,true,false,false,false,false,false],[true,false,false,false,false,false,false],[false,false,false,false,true,false,false],[false,false,false,false,false,false,false],[false,false,false,false,false,false,true],[false,false,true,false,false,false,false]]},
  {"level":[[".",".","1",".",".",".","."],[".",".",".","1",".",".","."],[".",".",".",".","1",".","."],[".",".","1",".",".",".","."],[".","1",".",".",".",".","."],[".",".",".","1",".",".","1"],[".",".",".",".","1",".","."]],"solution":[[true,false,false,false,true,false,false],[false,true,false,false,false,true,false],[false,false,true,false,false,false,true],[false,false,false,true,false,false,false],[false,true,false,false,false,true,false],[true,false,false,false,false,false,false],[false,false,false,true,false,false,true]]},
  {"level":[[".","1",".",".",".",".","."],[".",".",".",".","1","0","."],[".",".",".",".",".",".","1"],[".",".",".","1",".",".","."],["1",".",".",".",".",".","."],[".",".",".",".","1",".","."],[".","1",".",".",".",".","1"]],"solution":[[false,false,true,false,false,false,false],[true,false,false,false,false,false,false],[false,false,false,true,false,true,false],[false,false,false,false,false,false,true],[false,true,false,false,true,false,false],[true,false,false,false,false,false,false],[false,false,false,true,false,false,true]]},
  {"level":[[".",".",".",".","1",".","."],[".","1",".",".",".",".","."],[".",".","1",".",".",".","."],[".",".",".",".","1",".","."],[".","1",".",".",".",".","."],[".",".",".",".","1",".","."],[".",".","1",".",".","1","."]],"solution":[[true,false,false,false,false,false,true],[false,false,true,false,false,true,false],[false,true,false,false,true,false,false],[false,false,false,true,false,false,true],[false,true,false,false,true,false,false],[true,false,false,false,false,false,false],[false,false,true,false,true,false,false]]},
  {"level":[[".",".","1",".",".",".","0"],[".",".",".","0",".","1","."],[".",".",".",".",".",".","."],[".","1",".",".",".",".","."],["1",".",".",".",".",".","."],[".",".",".","1",".",".","."],[".",".",".",".","1",".","."]],"solution":[[false,false,true,false,false,false,false],[true,false,false,false,false,false,true],[false,false,false,true,false,false,false],[false,true,false,false,false,false,false],[false,false,false,true,false,false,false],[true,false,false,false,false,false,false],[false,false,false,false,true,false,true]]},
  {"level":[[".",".",".","1",".",".","."],[".","1",".",".",".",".","."],[".",".",".",".","1",".","."],[".",".","1",".",".",".","."],[".","1",".",".",".",".","."],[".",".",".","1",".",".","."],[".",".","1",".",".",".","1"]],"solution":[[false,true,false,false,false,false,true],[true,false,false,true,false,false,false],[false,false,true,false,false,true,false],[false,false,false,true,false,false,false],[false,true,false,false,false,true,false],[true,false,false,false,true,false,false],[false,false,true,false,false,false,true]]},
  {"level":[[".",".",".",".","1",".","."],[".",".",".",".",".",".","."],[".",".","1",".",".",".","."],[".",".",".",".","1",".","."],[".","1",".",".",".",".","."],[".",".",".",".","1",".","."],[".",".","1",".",".",".","1"]],"solution":[[true,false,false,false,false,false,true],[false,false,true,false,false,true,false],[false,true,false,false,true,false,false],[false,false,false,true,false,false,true],[false,true,false,false,true,false,false],[true,false,false,false,false,false,false],[false,false,true,false,true,false,false]]},
  {"level":[[".",".","1",".",".",".","0"],[".",".",".","0",".","1","."],[".",".",".",".",".",".","."],[".","1",".",".",".",".","."],["1",".",".",".",".",".","."],[".",".",".","1",".",".","."],[".",".",".",".","1",".","."]],"solution":[[false,false,true,false,false,false,false],[true,false,false,false,false,false,true],[false,false,false,true,false,false,false],[false,true,false,false,false,false,false],[false,false,false,true,false,false,false],[true,false,false,false,false,false,false],[false,false,false,false,true,false,true]]},
  {"level":[[".",".",".","1",".",".","."],[".","1",".",".",".",".","."],[".",".",".",".","1",".","."],[".",".","1",".",".",".","."],[".","1",".",".",".",".","."],[".",".",".","1",".",".","."],[".",".","1",".",".",".","1"]],"solution":[[false,true,false,false,false,false,true],[true,false,false,true,false,false,false],[false,false,true,false,false,true,false],[false,false,false,true,false,false,false],[false,true,false,false,false,true,false],[true,false,false,false,true,false,false],[false,false,true,false,false,false,true]]},
  {"level":[[".",".",".",".","1",".","."],[".",".",".",".",".",".","."],[".",".","1",".",".",".","."],[".",".",".",".","1",".","."],[".","1",".",".",".",".","."],[".",".",".",".","1",".","."],[".",".","1",".",".",".","1"]],"solution":[[true,false,false,false,false,false,true],[false,false,true,false,false,true,false],[false,true,false,false,true,false,false],[false,false,false,true,false,false,true],[false,true,false,false,true,false,false],[true,false,false,false,false,false,false],[false,false,true,false,true,false,false]]},
  {"level":[[".",".","1",".",".",".","0"],[".",".",".","0",".","1","."],[".",".",".",".",".",".","."],[".","1",".",".",".",".","."],["1",".",".",".",".",".","."],[".",".",".","1",".",".","."],[".",".",".",".","1",".","."]],"solution":[[false,false,true,false,false,false,false],[true,false,false,false,false,false,true],[false,false,false,true,false,false,false],[false,true,false,false,false,false,false],[false,false,false,true,false,false,false],[true,false,false,false,false,false,false],[false,false,false,false,true,false,true]]}
];

function countAdjacentStars(solution: boolean[][], row: number, col: number) {
  let adjacentStars = 0;

  for (const [rowStep, colStep] of CARDINAL_DIRECTIONS) {
    const nextRow = row + rowStep;
    const nextCol = col + colStep;

    if (
      nextRow >= 0 &&
      nextCol >= 0 &&
      nextRow < EASY_PUZZLE_SIZE &&
      nextCol < EASY_PUZZLE_SIZE &&
      solution[nextRow][nextCol]
    ) {
      adjacentStars += 1;
    }
  }

  return adjacentStars;
}

function buildEasyPuzzleFromCrop(
  sourcePuzzle: PuzzleDefinition,
  rowOffset: number,
  colOffset: number
): PuzzleDefinition {
  const croppedLevel = sourcePuzzle.level
    .slice(rowOffset, rowOffset + EASY_PUZZLE_SIZE)
    .map((row) => row.slice(colOffset, colOffset + EASY_PUZZLE_SIZE));
  const croppedSolution = sourcePuzzle.solution
    .slice(rowOffset, rowOffset + EASY_PUZZLE_SIZE)
    .map((row) => row.slice(colOffset, colOffset + EASY_PUZZLE_SIZE));

  const level = croppedLevel.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      if (cell === ".") {
        return "." as LevelCell;
      }

      const adjacentStars = countAdjacentStars(croppedSolution, rowIndex, colIndex);
      return ADJACENCY_CLUES[adjacentStars];
    })
  ) as LevelDefinition;

  return {
    level,
    solution: croppedSolution,
  };
}

const easyPuzzles = EASY_CROP_CONFIG.map(({ baseIndex, rowOffset, colOffset }) =>
  buildEasyPuzzleFromCrop(basePuzzles[baseIndex], rowOffset, colOffset)
);

export const puzzles: PuzzleDefinition[] = [
  ...easyPuzzles,
  ...basePuzzles.slice(EASY_PUZZLE_COUNT),
];

export function getPuzzleDifficulty(index: number): PuzzleDifficulty {
  return index < EASY_PUZZLE_COUNT ? "easy" : "medium";
}

export function toUtcDateString(date: Date) {
  const utc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  return utc.toISOString().slice(0, 10);
}

export function getPuzzleIndexForDate(date: Date) {
  const start = Date.UTC(
    PUZZLE_START_DATE.getUTCFullYear(),
    PUZZLE_START_DATE.getUTCMonth(),
    PUZZLE_START_DATE.getUTCDate()
  );
  const target = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const diff = Math.floor((target - start) / DAY_MS);
  if (diff < 0 || diff >= puzzles.length) {
    return null;
  }
  return diff;
}

export function getDateForPuzzleIndex(index: number) {
  const start = Date.UTC(
    PUZZLE_START_DATE.getUTCFullYear(),
    PUZZLE_START_DATE.getUTCMonth(),
    PUZZLE_START_DATE.getUTCDate()
  );
  return new Date(start + index * DAY_MS);
}
