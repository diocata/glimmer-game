import type {
  Cell,
  CellState,
  EvaluationResult,
  LevelDefinition,
} from "./types";

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

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
  const illuminatedMap = grid.map((row) => row.map(() => false));
  const conflictMap = grid.map((row) => row.map(() => false));
  const constraintViolations: EvaluationResult["constraintViolations"] = [];

  const inBounds = (row: number, col: number) =>
    row >= 0 && col >= 0 && row < size && col < grid[row].length;

  const markIlluminated = (row: number, col: number) => {
    if (inBounds(row, col)) {
      illuminatedMap[row][col] = true;
    }
  };

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < grid[row].length; col += 1) {
      const cell = grid[row][col];
      if (cell.state !== "star") {
        continue;
      }

      markIlluminated(row, col);

      for (const [rowStep, colStep] of directions) {
        let nextRow = row + rowStep;
        let nextCol = col + colStep;

        while (inBounds(nextRow, nextCol)) {
          const nextCell = grid[nextRow][nextCol];
          if (nextCell.base === "asteroid") {
            break;
          }

          markIlluminated(nextRow, nextCol);

          if (nextCell.state === "star") {
            conflictMap[row][col] = true;
            conflictMap[nextRow][nextCol] = true;
            break;
          }

          nextRow += rowStep;
          nextCol += colStep;
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
      for (const [rowStep, colStep] of directions) {
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

  let allLit = true;
  let hasConflicts = false;

  const evaluatedGrid = grid.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      const illuminated = cell.base === "empty" ? illuminatedMap[rowIndex][colIndex] : false;
      const conflict = conflictMap[rowIndex][colIndex];

      if (cell.base === "empty" && !illuminated) {
        allLit = false;
      }

      if (conflict) {
        hasConflicts = true;
      }

      return {
        ...cell,
        illuminated,
        conflict,
      };
    })
  );

  const win = allLit && !hasConflicts && constraintViolations.length === 0;

  return {
    grid: evaluatedGrid,
    allLit,
    hasConflicts,
    constraintViolations,
    win,
  };
}
