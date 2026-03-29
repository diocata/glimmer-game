import type { Cell } from "../types";

export function getShareText(grid: Cell[][], puzzleNumber: number) {
  return `Glimmer #${puzzleNumber}\n${grid
    .map((row) =>
      row
        .map((cell) => {
          if (cell.state === "star") return "*";
          if (cell.state === "marker") return "x";
          if (cell.base === "asteroid") return "#";
          return ".";
        })
        .join("")
    )
    .join("\n")}`;
}
