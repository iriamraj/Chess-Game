import type { Piece } from "../interfaces";

export function detectEmpty(
  board: (Piece | null)[][],
  xAxis: number | null,
  yAxis: number | null,
) {
  try {
    if (xAxis !== null && yAxis !== null) {
      return board[xAxis][yAxis] === null;
    }
  } catch (error) {
    return false;
  }
}
