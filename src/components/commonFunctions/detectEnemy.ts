import type { Piece } from "../interfaces";

export function detectEnemy(
  board: (Piece | null)[][],
  currentMove: string,
  xAxis: number | null,
  yAxis: number | null,
) {
  if (xAxis !== null && yAxis !== null) {
    const piece = board[xAxis][yAxis];
    if (piece) {
      return piece.color !== currentMove;
    }
  }
  return false;
}
