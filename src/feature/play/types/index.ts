export interface Position {
  row: number;
  col: number;
}

export interface LevelConfig {
  level: number;
  name: string;
  startNumber: number;
  totalNumbers: number;
  pattern: "straight" | "heart" | "star";
  description: string;
}

export interface GameState {
  numbers: number[];
  gridNumbers: number[];
  clickedSeq: number[];
  isComplete: boolean;
  isOver: boolean;
  health: number;
  wrongClick: number | null;
  msg: string;
  isInit: boolean;
  linePos: Position[];
  pattern: string;
  startNum: number;
}
