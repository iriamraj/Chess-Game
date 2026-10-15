import { useEffect, useState } from "react";

interface piecesSelect {
  isSelected: boolean;
  xAxis: null | number;
  yAxis: null | number;
}

interface piecesMove {
  canMove: boolean;
  xAxis: null | number;
  yAxis: null | number;
}

interface Piece {
  id: number;
  name: string;
  color: string;
  isFirstMove?: boolean;
}

export default function App() {
  const WHITE_PAWN_1: Piece = {
    id: 1,
    name: "pawn",
    color: "white",
    isFirstMove: true,
  };
  const WHITE_PAWN_2: Piece = {
    id: 2,
    name: "pawn",
    color: "white",
    isFirstMove: true,
  };
  const WHITE_PAWN_3: Piece = {
    id: 3,
    name: "pawn",
    color: "white",
    isFirstMove: true,
  };
  const WHITE_PAWN_4: Piece = {
    id: 4,
    name: "pawn",
    color: "white",
    isFirstMove: true,
  };
  const WHITE_PAWN_5: Piece = {
    id: 5,
    name: "pawn",
    color: "white",
    isFirstMove: true,
  };
  const WHITE_PAWN_6: Piece = {
    id: 6,
    name: "pawn",
    color: "white",
    isFirstMove: true,
  };
  const WHITE_PAWN_7: Piece = {
    id: 7,
    name: "pawn",
    color: "white",
    isFirstMove: true,
  };
  const WHITE_PAWN_8: Piece = {
    id: 8,
    name: "pawn",
    color: "white",
    isFirstMove: true,
  };
  const WHITE_ROOK_1: Piece = { id: 9, name: "rook", color: "white" };
  const WHITE_ROOK_2: Piece = { id: 10, name: "rook", color: "white" };
  const WHITE_KNIGHT_1: Piece = { id: 11, name: "knight", color: "white" };
  const WHITE_KNIGHT_2: Piece = {
    id: 12,
    name: "knight",
    color: "white",
  };
  const WHITE_BISHOP_1: Piece = {
    id: 13,
    name: "bishop",
    color: "white",
  };
  const WHITE_BISHOP_2: Piece = {
    id: 14,
    name: "bishop",
    color: "white",
  };
  const WHITE_QUEEN: Piece = { id: 15, name: "queen", color: "white" };
  const WHITE_KING: Piece = { id: 16, name: "king", color: "white" };

  const BLACK_PAWN_1: Piece = {
    id: 17,
    name: "pawn",
    color: "black",
    isFirstMove: true,
  };
  const BLACK_PAWN_2: Piece = {
    id: 18,
    name: "pawn",
    color: "black",
    isFirstMove: true,
  };
  const BLACK_PAWN_3: Piece = {
    id: 19,
    name: "pawn",
    color: "black",
    isFirstMove: true,
  };
  const BLACK_PAWN_4: Piece = {
    id: 20,
    name: "pawn",
    color: "black",
    isFirstMove: true,
  };
  const BLACK_PAWN_5: Piece = {
    id: 21,
    name: "pawn",
    color: "black",
    isFirstMove: true,
  };
  const BLACK_PAWN_6: Piece = {
    id: 22,
    name: "pawn",
    color: "black",
    isFirstMove: true,
  };
  const BLACK_PAWN_7: Piece = {
    id: 23,
    name: "pawn",
    color: "black",
    isFirstMove: true,
  };
  const BLACK_PAWN_8: Piece = {
    id: 24,
    name: "pawn",
    color: "black",
    isFirstMove: true,
  };

  const BLACK_ROOK_1: Piece = { id: 25, name: "rook", color: "black" };
  const BLACK_ROOK_2: Piece = { id: 26, name: "rook", color: "black" };
  const BLACK_KNIGHT_1: Piece = { id: 27, name: "knight", color: "black" };
  const BLACK_KNIGHT_2: Piece = { id: 28, name: "knight", color: "black" };
  const BLACK_BISHOP_1: Piece = { id: 29, name: "bishop", color: "black" };
  const BLACK_BISHOP_2: Piece = { id: 30, name: "bishop", color: "black" };
  const BLACK_QUEEN: Piece = { id: 31, name: "queen", color: "black" };
  const BLACK_KING: Piece = { id: 32, name: "king", color: "black" };

  const brd: (Piece | null)[][] = [
    [
      WHITE_ROOK_1,
      WHITE_KNIGHT_1,
      WHITE_BISHOP_1,
      WHITE_QUEEN,
      WHITE_KING,
      WHITE_BISHOP_2,
      WHITE_KNIGHT_2,
      WHITE_ROOK_2,
    ],
    [
      WHITE_PAWN_1,
      WHITE_PAWN_2,
      WHITE_PAWN_3,
      WHITE_PAWN_4,
      WHITE_PAWN_5,
      WHITE_PAWN_6,
      WHITE_PAWN_7,
      WHITE_PAWN_8,
    ],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [
      BLACK_PAWN_1,
      BLACK_PAWN_2,
      BLACK_PAWN_3,
      BLACK_PAWN_4,
      BLACK_PAWN_5,
      BLACK_PAWN_6,
      BLACK_PAWN_7,
      BLACK_PAWN_8,
    ],
    [
      BLACK_ROOK_1,
      BLACK_KNIGHT_1,
      BLACK_BISHOP_1,
      BLACK_QUEEN,
      BLACK_KING,
      BLACK_BISHOP_2,
      BLACK_KNIGHT_2,
      BLACK_ROOK_2,
    ],
  ];

  const [board, setBoard] = useState(brd);
  const [currentMove, setCurrentMove] = useState<string>(
    Math.random() < 0.5 ? "white" : "black",
  );

  const selectDefaultObj = {
    isSelected: false,
    xAxis: null,
    yAxis: null,
  };

  const moveDefaultObj = {
    canMove: false,
    xAxis: null,
    yAxis: null,
  };

  const [selectPieces, setSelectPieces] =
    useState<piecesSelect>(selectDefaultObj);
  const [movePosition, setMovePosition] = useState<piecesMove>(moveDefaultObj);

  function handelPieces(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    rowIDX: number,
    colIDX: number,
  ): void {
    e.stopPropagation();

    const isEmpty = detectEmpty(rowIDX, colIDX);
    const isEnemy = detectEnemy(rowIDX, colIDX);

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
      if (!isEmpty) {
        if (!isEnemy) {
          setSelectPieces((prev: piecesSelect) => ({
            ...prev,
            isSelected: true,
            xAxis: rowIDX,
            yAxis: colIDX,
          }));
        }
      }
    }
  }

  function canMovePosition(
    selectPieces: piecesSelect,
    rowIDX: number,
    colIDX: number,
  ) {
    const pieceType = checkPieceType(selectPieces.xAxis, selectPieces.yAxis);

    switch (pieceType) {
      case "pawn":
        const pawnMove = calculatePawn(selectPieces.xAxis, selectPieces.yAxis);
        if (
          pawnMove?.[0]?.includes(rowIDX) &&
          pawnMove?.[1]?.includes(colIDX)
        ) {
          return true;
        }
        break;
      default:
        break;
    }

    // const selRow = selectPieces.xAxis;
    // const selCol = selectPieces.yAxis;
    // return pawnMove(selRow, selCol, moveRow, moveCol);

    // if (selRow !== null && selCol !== null) {
    //   if (board[selRow][selCol]?.name === "pawn") {
    //     if (!detectEmpty(moveRow, moveCol)) return;

    //     if (board[selRow][selCol]?.isFirstMove) {
    //       if (board[selRow][selCol].id <= 8) {
    //         const isEmpty = detectEmpty(moveRow, moveCol);
    //         const isEnemy = detectEnemy(moveRow, moveCol);
    //         if (
    //           selRow + 1 === moveRow &&
    //           !isEmpty &&
    //           isEnemy &&
    //           (selCol - 1 === moveCol || selCol + 1 === moveCol)
    //         ) {
    //           return true;
    //         }

    //         return (
    //           (selRow + 1 === moveRow && selCol === moveCol) ||
    //           (selRow + 2 === moveRow && selCol === moveCol)
    //         );
    //       } else {
    //         return (
    //           (selRow - 1 === moveRow && selCol === moveCol) ||
    //           (selRow - 2 === moveRow && selCol === moveCol)
    //         );
    //       }
    //     } else {
    //       if (board[selRow][selCol].id <= 8) {
    //         return selRow + 1 === moveRow && selCol === moveCol;
    //       } else {
    //         return selRow - 1 === moveRow && selCol === moveCol;
    //       }
    //     }
    //   }
    // }
  }

  function checkPieceType(rowIDX: number | null, colIDX: number | null) {
    if (rowIDX && colIDX) return board[rowIDX][colIDX]?.name;
  }

  function calculatePawn(
    xAxis: number | null,
    yAxis: number | null,
  ): number[][] | undefined {
    if (xAxis && yAxis) {
      const pawn = board[xAxis][yAxis];
      let pawnCanMoveX = new Set<number>();
      let pawnCanMoveY = new Set<number>();

      if (pawn?.id && pawn?.id <= 8) {
        if (pawn.isFirstMove) {
          pawnCanMoveX.add(xAxis + 1).add(xAxis + 2);
          pawnCanMoveY.add(yAxis);
        } else {
          pawnCanMoveX.add(xAxis + 1);
          pawnCanMoveY.add(yAxis);
        }
        const hasEnemyLeft = detectEnemy(xAxis + 1, yAxis - 1);
        const hasEnemyRight = detectEnemy(xAxis + 1, yAxis + 1);
        if (hasEnemyLeft) {
          pawnCanMoveX.add(xAxis + 1);
          pawnCanMoveY.add(yAxis - 1);
        } else if (hasEnemyRight) {
          pawnCanMoveX.add(xAxis + 1);
          pawnCanMoveY.add(yAxis + 1);
        }
      } else {
        if (pawn?.isFirstMove) {
          pawnCanMoveX.add(xAxis - 1).add(xAxis - 2);
          pawnCanMoveY.add(yAxis);
        } else {
          pawnCanMoveX.add(xAxis - 1);
          pawnCanMoveY.add(yAxis);
        }

        const hasEnemyLeft = detectEnemy(xAxis - 1, yAxis - 1);
        const hasEnemyRight = detectEnemy(xAxis - 1, yAxis + 1);

        if (hasEnemyLeft) {
          pawnCanMoveX.add(xAxis - 1);
          pawnCanMoveY.add(yAxis - 1);
        } else if (hasEnemyRight) {
          pawnCanMoveX.add(xAxis - 1);
          pawnCanMoveY.add(yAxis + 1);
        }
      }
      return [Array.from(pawnCanMoveX), Array.from(pawnCanMoveY)];
    }
  }

  function detectEnemy(xAxis: number | null, yAxis: number | null) {
    if (xAxis !== null && yAxis !== null) {
      const piece = board[xAxis][yAxis];
      if (piece?.color) return piece.color !== currentMove;
    }
  }

  function detectEmpty(xAxis: number | null, yAxis: number | null) {
    if (xAxis !== null && yAxis !== null) {
      return board[xAxis][yAxis] === null;
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
        removeSelect();
      }
      setBoard(virBoard);
      setCurrentMove((prev) => (prev === "white" ? "black" : "white"));
      removeSelect();
    }
  }

  function removeSelect(): void {
    setSelectPieces(selectDefaultObj);
    setMovePosition(moveDefaultObj);
  }

  return (
    <div
      onClick={removeSelect}
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
