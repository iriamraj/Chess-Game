import { useEffect, useState } from "react";
import type { piecesSelect, piecesMove, Piece } from "./components/interfaces";
import { calculatePawn } from "./components/calculateMove/pawn";
import { detectEnemy } from "./components/commonFunctions/detectEnemy";
import { detectEmpty } from "./components/commonFunctions/detectEmpty";
import { removeSelect } from "./components/commonFunctions/removeSelect";
import { checkPieceType } from "./components/commonFunctions/checkPieceType";
import { initialBoard } from "./components/board";
import { calculateRook } from "./components/calculateMove/rook";
import { calculateKnight } from "./components/calculateMove/knight";

export const selectDefaultObj = {
  isSelected: false,
  xAxis: null,
  yAxis: null,
};

export const moveDefaultObj = {
  canMove: false,
  xAxis: null,
  yAxis: null,
};

export default function App() {
  const [board, setBoard] = useState<(Piece | null)[][]>(initialBoard);
  const [currentMove, setCurrentMove] = useState<string>(
    Math.random() < 0.5 ? "white" : "black",
  );
  const [selectPieces, setSelectPieces] =
    useState<piecesSelect>(selectDefaultObj);
  const [movePosition, setMovePosition] = useState<piecesMove>(moveDefaultObj);

  function handelPieces(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    rowIDX: number,
    colIDX: number,
  ): void {
    e.stopPropagation();
    const isEmpty = detectEmpty(board, rowIDX, colIDX);
    const isEnemy = !isEmpty && detectEnemy(board, currentMove, rowIDX, colIDX);
    const currentPiece = board[rowIDX][colIDX];

    if (selectPieces.isSelected) {
      if (isEmpty) {
        const canMove = canMovePosition(selectPieces, rowIDX, colIDX);
        if (canMove) {
          setMovePosition((prev: piecesMove) => ({
            ...prev,
            canMove: true,
            xAxis: rowIDX,
            yAxis: colIDX,
          }));
          if (currentPiece?.isFirstMove) currentPiece.isFirstMove = false;
        }
      } else {
        if (isEnemy) {
          const canMove = canMovePosition(selectPieces, rowIDX, colIDX);
          if (canMove) {
            setMovePosition((prev: piecesMove) => ({
              ...prev,
              canMove: true,
              xAxis: rowIDX,
              yAxis: colIDX,
            }));
          }
        } else {
          setSelectPieces((prev: piecesSelect) => ({
            ...prev,
            isSelected: true,
            xAxis: rowIDX,
            yAxis: colIDX,
          }));
        }
      }
    } else {
      if (!isEmpty && !isEnemy) {
        setSelectPieces((prev: piecesSelect) => ({
          ...prev,
          isSelected: true,
          xAxis: rowIDX,
          yAxis: colIDX,
        }));
      }
    }
  }

  function canMovePosition(
    selectPieces: piecesSelect,
    rowIDX: number,
    colIDX: number,
  ) {
    const pieceType = checkPieceType(
      board,
      selectPieces.xAxis,
      selectPieces.yAxis,
    );
    switch (pieceType) {
      case "pawn":
        const pawnMove = calculatePawn(
          board,
          currentMove,
          selectPieces.xAxis,
          selectPieces.yAxis,
        );
        const row = pawnMove?.[0];
        const col = pawnMove?.[1];
        if (row?.includes(rowIDX) && col?.includes(colIDX)) return true;
        break;
      case "rook":
        const rookMove = calculateRook(
          board,
          currentMove,
          selectPieces.xAxis,
          selectPieces.yAxis,
        );
        const rookRow = rookMove?.[0];
        const rookCol = rookMove?.[1];
        if (rookRow?.includes(rowIDX) && rookCol?.includes(colIDX)) return true;
        break;
      case "knight":
        const knightMove = calculateKnight(
          board,
          currentMove,
          selectPieces.xAxis,
          selectPieces.yAxis,
        );
        const knightRow = knightMove?.[0];
        const knightCol = knightMove?.[1];
        if (knightRow?.includes(rowIDX) && knightCol?.includes(colIDX))
          return true;
        break;
      default:
        return false;
        break;
    }
  }

  useEffect(movePieces, [selectPieces, movePosition]);

  function movePieces() {
    const selectXAxis = selectPieces.xAxis;
    const selectYAxis = selectPieces.yAxis;

    const moveXAxis = movePosition.xAxis;
    const moveYAxis = movePosition.yAxis;

    const isDataExit =
      selectXAxis !== null &&
      selectYAxis !== null &&
      moveXAxis !== null &&
      moveYAxis !== null;

    if (isDataExit) {
      const virBoard = structuredClone(board);

      if (selectPieces.isSelected && movePosition.canMove) {
        virBoard[moveXAxis][moveYAxis] = virBoard[selectXAxis][selectYAxis];
        virBoard[selectXAxis][selectYAxis] = null;
      } else {
        removeSelect(setSelectPieces, setMovePosition);
      }
      setBoard(virBoard);
      setCurrentMove((prev) => (prev === "white" ? "black" : "white"));
      removeSelect(setSelectPieces, setMovePosition);
    }
  }

  return (
    <div
      onClick={() => removeSelect(setSelectPieces, setMovePosition)}
      className="w-full h-screen flex items-center justify-center"
    >
      <div className="w-150 max-h-150 h-150 border border-black">
        {board.map((row, rowIDX) => (
          <div key={rowIDX} className="w-full h-18.75 flex justify-between">
            {row.map((col, colIDX) => {
              const isSelected =
                selectPieces.isSelected !== null &&
                selectPieces.xAxis === rowIDX &&
                selectPieces.yAxis === colIDX;

              const isDarkSquare = (rowIDX + colIDX) % 2 === 0;

              return (
                <div
                  key={colIDX}
                  onClick={(e) => handelPieces(e, rowIDX, colIDX)}
                  className={`border border-black w-18.75 flex items-center justify-center ${
                    isSelected
                      ? "bg-green-300"
                      : isDarkSquare
                        ? "bg-gray-400"
                        : ""
                  }`}
                >
                  <div
                    className={`w-15 h-15 rounded-full flex items-center justify-center 
                      ${col?.color === "black" ? "bg-black border border-white" : col?.color === "white" && "bg-white border border-black "}`}
                  >
                    <p className={`${col?.color === "black" && "text-white"}`}>
                      {col ? col.name : col}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
