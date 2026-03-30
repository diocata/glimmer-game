import type {
  Cell,
  CellState,
  EvaluationResult,
  LevelDefinition,
} from "./types";

const cardinalDirections = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
] as const;

const touchingDirections = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
] as const;

export function createGridFromLevel(level: LevelDefinition): Cell[][] {
  return level.map((row) =>
    row.map((cell) => {
      if (cell === ".") {
        return { base: "empty", state: "empty" } as Cell;
      }

      if (cell === "#") {
        return { base: "asteroid", state: "empty" } as Cell;
      }

      return {
        base: "asteroid",
        state: "empty",
        value: Number(cell),
      } as Cell;
    })
  );
}

export function cycleCellState(cell: Cell): CellState {
  if (cell.base === "asteroid") {
    return cell.state;
  }

  if (cell.state === "empty") {
    return "star";
  }

  if (cell.state === "star") {
    return "marker";
  }

  return "empty";
}

export function updateCellState(
  grid: Cell[][],
  row: number,
  col: number,
  nextState: CellState
): Cell[][] {
  return grid.map((gridRow, rowIndex) =>
    gridRow.map((cell, colIndex) => {
      if (rowIndex !== row || colIndex !== col) {
        return cell;
      }

      return { ...cell, state: nextState };
    })
  );
}

export function evaluateBoard(grid: Cell[][]): EvaluationResult {
  const size = grid.length;
  const conflictMap = grid.map((row) => row.map(() => false));
  const constraintViolations: EvaluationResult["constraintViolations"] = [];
  const rowCounts = new Array(size).fill(0);
  const colCounts = new Array(size).fill(0);

  const inBounds = (row: number, col: number) =>
    row >= 0 && col >= 0 && row < size && col < grid[row].length;

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < grid[row].length; col += 1) {
      if (grid[row][col].state === "star") {
        rowCounts[row] += 1;
        colCounts[col] += 1;
      }
    }
  }

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < grid[row].length; col += 1) {
      if (grid[row][col].state !== "star") {
        continue;
      }

      for (const [rowStep, colStep] of touchingDirections) {
        const nextRow = row + rowStep;
        const nextCol = col + colStep;

        if (!inBounds(nextRow, nextCol)) {
          continue;
        }

        if (grid[nextRow][nextCol].state === "star") {
          conflictMap[row][col] = true;
          conflictMap[nextRow][nextCol] = true;
        }
      }
    }
  }

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < grid[row].length; col += 1) {
      const cell = grid[row][col];
      if (cell.base !== "asteroid" || typeof cell.value !== "number") {
        continue;
      }

      let count = 0;
      for (const [rowStep, colStep] of cardinalDirections) {
        const nextRow = row + rowStep;
        const nextCol = col + colStep;
        if (inBounds(nextRow, nextCol) && grid[nextRow][nextCol].state === "star") {
          count += 1;
        }
      }

      if (count !== cell.value) {
        constraintViolations.push({
          row,
          col,
          expected: cell.value,
          actual: count,
        });
      }
    }
  }

  const rowViolations = rowCounts
    .map((count, index) => ({ index, expected: 1, actual: count }))
    .filter((line) => line.actual !== line.expected);
  const colViolations = colCounts
    .map((count, index) => ({ index, expected: 1, actual: count }))
    .filter((line) => line.actual !== line.expected);

  let hasTouchConflicts = false;

  const evaluatedGrid = grid.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      const conflict = conflictMap[rowIndex][colIndex];
      if (conflict) {
        hasTouchConflicts = true;
      }

      return {
        ...cell,
        illuminated: false,
        conflict,
      };
    })
  );

  const allLit = rowViolations.length === 0 && colViolations.length === 0;
  const hasConflicts = hasTouchConflicts;
  const win =
    rowViolations.length === 0 &&
    colViolations.length === 0 &&
    !hasTouchConflicts &&
    constraintViolations.length === 0;

  return {
    grid: evaluatedGrid,
    allLit,
    hasConflicts,
    hasTouchConflicts,
    constraintViolations,
    rowViolations,
    colViolations,
    win,
  };
}
