import React from 'react';
import { SudokuGridColumn } from '../types';


interface SudokuGameProps {
  puzzle: SudokuGridColumn[][];
  onSolve: (solution: number[][]) => void;
}


export function SudokuGame({ puzzle, onSolve }: SudokuGameProps) {
  const [grid, setGrid] = React.useState<SudokuGridColumn[][]>(puzzle);

  const isValidMove = (row: number, col: number, num: number): boolean => {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (grid[row][x].number === num) return false;
    }

    // Check column
    for (let x = 0; x < 9; x++) {
      if (grid[x][col].number === num) return false;
    }

    // Check 3x3 box
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i + startRow][j + startCol].number === num) return false;
      }
    }

    return true;
  };

  const handleCellChange = (row: number, col: number, value: number) => {
    if (puzzle[row][col].number === 0 && (value === 0 || isValidMove(row, col, value))) {
      const newGrid = grid.map(r => [...r]);
      newGrid[row][col].number = value;
      setGrid(newGrid);
      
      // Check if puzzle is complete
      const isComplete = newGrid.every(row => row.every(cell => cell.number !== 0));
      if (isComplete) {
        onSolve(newGrid.map(row => row.map(cell => cell.number)));
      }
    }
  };

  return (
    <div className="grid grid-cols-9 gap-0.5 bg-gray-300 p-0.5 max-w-md mx-auto">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <input
            key={`${rowIndex}-${colIndex}`}
            type="number"
            min="1"
            max="9"
            value={cell.number || ''}
            disabled={puzzle[rowIndex][colIndex].isOriginal}
            onChange={(e) => {
              const value = e.target.value ? parseInt(e.target.value) : 0;
              if (value >= 0 && value <= 9) {
                handleCellChange(rowIndex, colIndex, value);
              }
            }}
            className={`w-10 h-10 text-center border ${
              puzzle[rowIndex][colIndex].isOriginal ? 'bg-gray-100' : 'bg-white'
            } ${
              (Math.floor(rowIndex / 3) + Math.floor(colIndex / 3)) % 2 === 0
                ? 'bg-opacity-50'
                : ''
            } focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:text-gray-700 disabled:bg-gray-100`}
          />
        ))
      )}
    </div>
  );
}