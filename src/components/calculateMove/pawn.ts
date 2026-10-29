import { detectEnemy } from "../commonFunctions/detectEnemy";
import type { Piece } from "../interfaces";

export function calculatePawn(
  board: (Piece | null)[][],
  currentMove: string,
  xAxis: number | null,
  yAxis: number | null,
): number[][] | undefined {
  if (xAxis !== null && yAxis !== null) {
    const pawn = board[xAxis][yAxis];
    let pawnCanMoveX = new Set<number>();
    let pawnCanMoveY = new Set<number>();

    if (pawn?.id && pawn?.id <= 8) {
      if (pawn.isFirstMove) {
        pawnCanMoveX.add(xAxis + 1).add(xAxis + 2);
        pawnCanMoveY.add(yAxis);
        pawn.isFirstMove = false;
      } else {
        pawnCanMoveX.add(xAxis + 1);
        pawnCanMoveY.add(yAxis);
      }
      const hasEnemyLeft = detectEnemy(
        board,
        currentMove,
        xAxis + 1,
        yAxis - 1,
      );
      const hasEnemyRight = detectEnemy(
        board,
        currentMove,
        xAxis + 1,
        yAxis + 1,
      );
      if (hasEnemyLeft) {
        pawnCanMoveX.add(xAxis + 1);
        pawnCanMoveY.add(yAxis - 1);
      }
      if (hasEnemyRight) {
        pawnCanMoveX.add(xAxis + 1);
        pawnCanMoveY.add(yAxis + 1);
      }
    } else {
      if (pawn?.isFirstMove) {
        pawnCanMoveX.add(xAxis - 1).add(xAxis - 2);
        pawnCanMoveY.add(yAxis);
        pawn.isFirstMove = false;
      } else {
        pawnCanMoveX.add(xAxis - 1);
        pawnCanMoveY.add(yAxis);
      }

      const hasEnemyLeft = detectEnemy(
        board,
        currentMove,
        xAxis - 1,
        yAxis - 1,
      );
      const hasEnemyRight = detectEnemy(
        board,
        currentMove,
        xAxis - 1,
        yAxis + 1,
      );

      if (hasEnemyLeft) {
        pawnCanMoveX.add(xAxis - 1);
        pawnCanMoveY.add(yAxis - 1);
      }
      if (hasEnemyRight) {
        pawnCanMoveX.add(xAxis - 1);
        pawnCanMoveY.add(yAxis + 1);
      }
    }
    return [Array.from(pawnCanMoveX), Array.from(pawnCanMoveY)];
  }
}
