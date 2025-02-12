import React from 'react';
import { SudokuGridColumn } from '../types';

interface SudokuBoardProps {
  puzzle: SudokuGridColumn[][];
  onCellChange: (row: number, col: number, value: number ) => void;
}

export function SudokuBoard({ puzzle, onCellChange }: SudokuBoardProps) {
  return (
    <div className="grid grid-cols-9 gap-0 bg-orange-100 p-1 border-4 border-red-700 max-w-md mx-auto">
      {puzzle.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isThickBorderRight = (colIndex + 1) % 3 === 0 && colIndex !== 8;
          const isThickBorderBottom = (rowIndex + 1) % 3 === 0 && rowIndex !== 8;

          return (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              inputMode="numeric"
              pattern="[1-9]"
              disabled={cell.isOriginal}
              maxLength={1}
              value={cell.number || ''}
              onChange={(e) => {
                if (e.target.value === '') {
                  onCellChange(rowIndex, colIndex, 0);
                }
                const value = e.target.value ? parseInt(e.target.value) : 0;
                if (value >= 1 && value <= 9) {
                  onCellChange(rowIndex, colIndex, value);
                } else {
                  onCellChange(rowIndex, colIndex, 0);
                }
              }}
              className={`w-10 h-10 text-center text-xl font-bold border border-gray-900 
                ${isThickBorderRight ? 'border-r-4 ' : ''}
                ${isThickBorderBottom ? 'border-b-4' : ''}
                ${cell.isOriginal ? 'bg-purple-100 text-gray-800' : 'text-black'}
                focus:outline-none focus:ring-2 focus:ring-red-500`}
            />
          );
        })
      )}
    </div>
  );
}
