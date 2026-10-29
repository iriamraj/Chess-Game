import { detectEmpty } from "../commonFunctions/detectEmpty";
import { detectEnemy } from "../commonFunctions/detectEnemy";
import type { Piece } from "../interfaces";

export function calculateKnight(
  board: (Piece | null)[][],
  currentMove: string,
  xAxis: number | null,
  yAxis: number | null,
) {
  if (xAxis !== null && yAxis !== null) {
    let knightCanMoveX = new Set<number>();
    let knightCanMoveY = new Set<number>();

    try {
      //right top move
      const rightTopIsEmpty = detectEmpty(board, xAxis - 1, yAxis + 2);
      const rightTopIsEnemy =
        !rightTopIsEmpty &&
        detectEnemy(board, currentMove, xAxis - 1, yAxis + 2);
      if (rightTopIsEmpty || rightTopIsEnemy) {
        knightCanMoveX.add(xAxis - 1);
        knightCanMoveY.add(yAxis + 2);
      }
    } catch (error) {}

    try {
      //right bottom move
      const rightBottomIsEmpty = detectEmpty(board, xAxis + 1, yAxis + 2);
      const rightBottomIsEnemy =
        !rightBottomIsEmpty &&
        detectEnemy(board, currentMove, xAxis + 1, yAxis + 2);
      if (rightBottomIsEmpty || rightBottomIsEnemy) {
        knightCanMoveX.add(xAxis + 1);
        knightCanMoveY.add(yAxis + 2);
      }
    } catch (error) {}

    try {
      //bottom right move
      const BottomRightIsEmpty = detectEmpty(board, xAxis + 2, yAxis + 1);
      const BottomRightIsEnemy =
        !BottomRightIsEmpty &&
        detectEnemy(board, currentMove, xAxis + 2, yAxis + 1);
      if (BottomRightIsEmpty || BottomRightIsEnemy) {
        knightCanMoveX.add(xAxis + 2);
        knightCanMoveY.add(yAxis + 1);
      }
    } catch (error) {}

    try {
      //bottom left move
      const BottomLeftIsEmpty = detectEmpty(board, xAxis + 2, yAxis - 1);
      const BottomLeftIsEnemy =
        !BottomLeftIsEmpty &&
        detectEnemy(board, currentMove, xAxis + 2, yAxis - 1);
      if (BottomLeftIsEmpty || BottomLeftIsEnemy) {
        knightCanMoveX.add(xAxis + 2);
        knightCanMoveY.add(yAxis - 1);
      }
    } catch (error) {}

    try {
      //left bottom move
      const LeftBottomIsEmpty = detectEmpty(board, xAxis + 1, yAxis - 2);
      const LeftBottomIsEnemy =
        !LeftBottomIsEmpty &&
        detectEnemy(board, currentMove, xAxis + 1, yAxis - 2);
      if (LeftBottomIsEmpty || LeftBottomIsEnemy) {
        knightCanMoveX.add(xAxis + 1);
        knightCanMoveY.add(yAxis - 2);
      }
    } catch (error) {}

    try {
      //left top move
      const LeftTopIsEmpty = detectEmpty(board, xAxis - 1, yAxis - 2);
      const LeftTopIsEnemy =
        !LeftTopIsEmpty &&
        detectEnemy(board, currentMove, xAxis - 1, yAxis - 2);
      if (LeftTopIsEmpty || LeftTopIsEnemy) {
        knightCanMoveX.add(xAxis - 1);
        knightCanMoveY.add(yAxis - 2);
      }
    } catch (error) {}

    try {
      //top left move
      const TopLeftIsEmpty = detectEmpty(board, xAxis - 2, yAxis - 1);
      const TopLeftIsEnemy =
        !TopLeftIsEmpty &&
        detectEnemy(board, currentMove, xAxis - 2, yAxis - 1);
      if (TopLeftIsEmpty || TopLeftIsEnemy) {
        knightCanMoveX.add(xAxis - 2);
        knightCanMoveY.add(yAxis - 1);
      }
    } catch (error) {}

    try {
      //top right move
      const topRightIsEmpty = detectEmpty(board, xAxis - 2, yAxis + 1);
      const topRightIsEnemy =
        !topRightIsEmpty &&
        detectEnemy(board, currentMove, xAxis - 2, yAxis + 1);
      if (topRightIsEmpty || topRightIsEnemy) {
        knightCanMoveX.add(xAxis - 2);
        knightCanMoveY.add(yAxis + 1);
      }
    } catch (error) {}
    return [Array.from(knightCanMoveX), Array.from(knightCanMoveY)];
  }
}
