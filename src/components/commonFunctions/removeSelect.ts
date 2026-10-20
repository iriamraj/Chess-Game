import React from "react";
import { moveDefaultObj, selectDefaultObj } from "../../App";
import type { piecesMove, piecesSelect } from "../interfaces";

export function removeSelect(
  setSelectPieces: React.Dispatch<React.SetStateAction<piecesSelect>>,
  setMovePosition: React.Dispatch<React.SetStateAction<piecesMove>>
): void {
  setSelectPieces(selectDefaultObj);
  setMovePosition(moveDefaultObj);
}