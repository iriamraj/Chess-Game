import type { Piece } from "../interfaces";

export function checkPieceType(
  board: (Piece | null)[][],
  rowIDX: number | null,
  colIDX: number | null,
) {
  if (rowIDX !== null && colIDX !== null) return board[rowIDX][colIDX]?.name;
}
