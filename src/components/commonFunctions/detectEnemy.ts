import type { Piece } from "../interfaces";

export function detectEnemy(
  board: (Piece | null)[][],
  currentMove: string,
  xAxis: number | null,
  yAxis: number | null,
) {
  try {
    if (xAxis !== null && yAxis !== null) {
      const piece = board[xAxis][yAxis];
      if (piece) {
        return piece.color !== currentMove;
      }
    }
  } catch (error) {
    return false;
  }
}
