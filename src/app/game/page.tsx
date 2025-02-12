
"use client";
import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { SudokuBoard } from '../components/SudokuBoard';
import { GameData, SudokuGridColumn } from '../types';
import sudoku from "../utils/sudoku.js";

import hmacSHA512 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import { SECRET_KEY } from '../utils/constant';

function Game() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const name = searchParams.get('name');
    const message = searchParams.get('message');
    const difficulty = parseInt(searchParams.get('difficulty') ?? '1');
    const sodoku_imp = sudoku()
    const [puzzle, setPuzzle] = React.useState<SudokuGridColumn[][]>(
        Array(9).fill(null).map(() => Array(9).fill(0))
    );
    const [gameData, setGameData] = React.useState<GameData | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        // TODO: Fetch puzzle from backend
        const mockFetch = async () => {
            setGameData({
                puzzle: Array.from({ length: 9 }, () =>
                    Array.from({ length: 9 }, () => new SudokuGridColumn())
                ),
                name: name || '',
                message: message || '',
                difficulty: difficulty || 1,
                hash: 'mock-hash'
            });
        };
        mockFetch();
    }, [name, message, difficulty]);

    React.useEffect(() => {
        async function name() {
            const difficulty = 81 - (8 * (gameData?.difficulty ?? 1));
            const p = sodoku_imp.generate(difficulty, true)
            const newpuzzel = Array.from({ length: 9 }, () =>
                Array.from({ length: 9 }, () => new SudokuGridColumn())
            )
            for (let i = 0; i < p.length; i++) {
                if (p[i] != '.') {
                    newpuzzel[Math.floor(i / 9)][i % 9].number = parseInt(p[i])
                    newpuzzel[Math.floor(i / 9)][i % 9].isOriginal = true

                }

            }
            setPuzzle(newpuzzel)
        }
        name()
    }, [gameData]);

    function isValidSudoku(grid: number[][]) {
        // Helper function to check if an array contains unique numbers 1-9
        function hasUniqueNumbers(arr: number[]) {
            return new Set(arr).size === 9;
        }

        // Check rows
        for (const row of grid) {
            if (!hasUniqueNumbers(row)) return false;
        }

        // Check columns
        for (let col = 0; col < 9; col++) {
            const column = grid.map(row => row[col]);
            if (!hasUniqueNumbers(column)) return false;
        }

        // Check 3x3 subgrids
        for (let row = 0; row < 9; row += 3) {
            for (let col = 0; col < 9; col += 3) {
                const subgrid = [];
                for (let r = 0; r < 3; r++) {
                    for (let c = 0; c < 3; c++) {
                        subgrid.push(grid[row + r][col + c]);
                    }
                }
                if (!hasUniqueNumbers(subgrid)) return false;
            }
        }

        return true;
    }


    const handleSubmit = async () => {
        // TODO: Implement solution verification
        const puzzleNumber = puzzle.map(row => row.map(cell => cell.number));
        if (isValidSudoku(puzzleNumber)) {
            const data = {
                "name": gameData?.name ?? "",
                "message": gameData?.message ?? "",
                "difficulty": gameData?.difficulty ?? "",
            }
            const body = JSON.stringify(data);
            const signature = Base64.stringify(hmacSHA512(body, SECRET_KEY));
            const body64 = btoa(body)
            const hash = encodeURIComponent(body64 + '.' + signature)
        router.push('/rose?hash=' + hash);
        } else {
            setError('Opps!! Looks like your solution needs more effort');
        }

    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-200 to-pink-200 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    🌹 Solve the Puzzle to Grow Your Rose 🌹
                    </h2>

                    {gameData && (
                        <div className="space-y-8">
                            <div className="text-center space-y-2">
                                <p className="text-gray-600">Creating a rose for: <span className='font-semibold text-red-500'>{gameData.name}</span></p>
                                <p className="text-gray-600">
                                    Difficulty:<span className="text-red-500">🌵</span>{gameData.difficulty} <span className='text-gray-800'> {gameData.difficulty === 1 ? 'thorn' : 'thorns'} </span>
                                </p>
                            </div>

                            <SudokuBoard
                                puzzle={puzzle}
                                onCellChange={(row, col, value) => {
                                    const newPuzzle = [...puzzle];
                                    newPuzzle[row][col].number = value;
                                    setPuzzle(newPuzzle);
                                }}
                            />

                            <button
                                onClick={handleSubmit}
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                            >
                                Submit Solution
                            </button>
                            <div className="text-center text-red-500">{error}</div>
                            
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


export default function Page() { // Wrap in a Suspense boundary
  return (
    <Suspense fallback={<p>Loading...</p>}>  {/* Display while data is fetching */}
      <Game />
    </Suspense>
  );
}