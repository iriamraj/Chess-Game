import { detectEmpty } from "../commonFunctions/detectEmpty";
import { detectEnemy } from "../commonFunctions/detectEnemy";
import type { Piece } from "../interfaces";

export interface Coordinate {
  x: number;
  y: number;
}

export function calculateBishop(
  board: (Piece | null)[][],
  currentMove: string,
  xAxis: number | null,
  yAxis: number | null,
): Coordinate[] {
  if (xAxis === null || yAxis === null) return [];

  const validMoves: Coordinate[] = [];

  // Define the 4 diagonal directions (dx for row/xAxis, dy for col/yAxis)
  const directions = [
    { dx: -1, dy: 1 },  // Top-Right
    { dx: 1, dy: 1 },   // Bottom-Right
    { dx: 1, dy: -1 },  // Bottom-Left
    { dx: -1, dy: -1 }  // Top-Left
  ];

  for (const { dx, dy } of directions) {
    let newXAxis = xAxis + dx;
    let newYAxis = yAxis + dy;

    // Slide along the diagonal within board boundaries (0 to 7)
    while (newXAxis >= 0 && newXAxis < 8 && newYAxis >= 0 && newYAxis < 8) {
      const isEmpty = detectEmpty(board, newXAxis, newYAxis);
      const isEnemy = !isEmpty && detectEnemy(board, currentMove, newXAxis, newYAxis);

      if (isEmpty) {
        validMoves.push({ x: newXAxis, y: newYAxis });
      } else {
        // If it's an enemy, it's a valid capture move before blocking
        if (isEnemy) {
          validMoves.push({ x: newXAxis, y: newYAxis });
        }
        break; // Hit a piece (friendly or enemy), stop sliding in this direction
      }

      newXAxis += dx;
      newYAxis += dy;
    }
  }

  return validMoves;
}