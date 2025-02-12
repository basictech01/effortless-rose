export interface RoseFormData {
  name: string;
  message: string;
  difficulty: number;
}

export interface GameData {
  puzzle: SudokuGridColumn[][];
  name: string;
  message: string;
  difficulty: number;
  hash: string;
}

export interface GameSubmission {
  puzzle: number[][];
  solution: number[][];
  name: string;
  phoneNumber: string;
  difficulty: number;
  hash: string;
}

export interface SignedRoseData {
  name: string;
  phoneNumber: string;
  difficulty:  number;
  signature: string;
}

export class SudokuGridColumn {
  number: number;
  isOriginal: boolean;
  constructor(value = 0, isFixed = false) {
    this.number = value; // Stores the number (0 means empty)
    this.isOriginal = isFixed; // Indicates whether the number is pre-filled
  }
}