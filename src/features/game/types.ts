export type CellBase = "empty" | "asteroid";
export type CellState = "empty" | "star" | "marker";

export interface Cell {
  base: CellBase;
  value?: number;
  state: CellState;
}

export interface EvaluatedCell extends Cell {
  illuminated: boolean;
  conflict: boolean;
}

export interface ConstraintViolation {
  row: number;
  col: number;
  expected: number;
  actual: number;
}

export interface LineViolation {
  index: number;
  expected: number;
  actual: number;
}

export interface EvaluationResult {
  grid: EvaluatedCell[][];
  allLit: boolean;
  hasConflicts: boolean;
  hasTouchConflicts: boolean;
  constraintViolations: ConstraintViolation[];
  rowViolations: LineViolation[];
  colViolations: LineViolation[];
  win: boolean;
}

export type LevelCell = "." | "#" | "0" | "1" | "2" | "3" | "4";
export type LevelDefinition = LevelCell[][];
