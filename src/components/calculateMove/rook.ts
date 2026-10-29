import { detectEmpty } from "../commonFunctions/detectEmpty";
import { detectEnemy } from "../commonFunctions/detectEnemy";
import type { Piece } from "../interfaces";

export function calculateRook(
  board: (Piece | null)[][],
  currentMove: string,
  xAxis: number | null,
  yAxis: number | null,
) {
  if (xAxis !== null && yAxis !== null) {
    let rookCanMoveX = new Set<number>();
    let rookCanMoveY = new Set<number>();

    for (let i = xAxis + 1; i < 8; i++) {
      const isEmptyAtI = detectEmpty(board, i, yAxis);
      const isEnemyAtI =
        !isEmptyAtI && detectEnemy(board, currentMove, i, yAxis);

      if (isEmptyAtI) {
        rookCanMoveX.add(i);
      } else if (isEnemyAtI) {
        rookCanMoveX.add(i);
        break;
      }
    }
    for (let i = xAxis - 1; i >= 0; i--) {
      const isEmptyAtI = detectEmpty(board, i, yAxis);
      const isEnemyAtI =
        !isEmptyAtI && detectEnemy(board, currentMove, i, yAxis);

      if (isEmptyAtI) {
        rookCanMoveX.add(i);
      } else if (isEnemyAtI) {
        rookCanMoveX.add(i);
        break;
      }
    }

    for (let i = yAxis + 1; i < 8; i++) {
      const isEmptyAtI = detectEmpty(board, xAxis, i);
      const isEnemyAtI =
        !isEmptyAtI && detectEnemy(board, currentMove, xAxis, i);

      if (isEmptyAtI) {
        rookCanMoveY.add(i);
      } else if (isEnemyAtI) {
        rookCanMoveY.add(i);
        break;
      }
    }

    for (let i = yAxis - 1; i >= 0; i--) {
      const isEmptyAtI = detectEmpty(board, xAxis, i);
      const isEnemyAtI =
        !isEmptyAtI && detectEnemy(board, currentMove, xAxis, i);

      if (isEmptyAtI) {
        rookCanMoveY.add(i);
      } else if (isEnemyAtI) {
        rookCanMoveY.add(i);
        break;
      }
    }
    rookCanMoveX.add(xAxis);
    rookCanMoveY.add(yAxis);
    return [Array.from(rookCanMoveX), Array.from(rookCanMoveY)];
  }
}
