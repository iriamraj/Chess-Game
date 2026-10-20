export interface piecesSelect {
  isSelected: boolean;
  xAxis: null | number;
  yAxis: null | number;
}

export interface piecesMove {
  canMove: boolean;
  xAxis: null | number;
  yAxis: null | number;
}

export interface Piece {
  id: number;
  name: string;
  color: string;
  isFirstMove?: boolean;
}
