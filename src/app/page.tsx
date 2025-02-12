import React from 'react';
import { RoseForm } from './components/RoseForm';
import { Heart } from 'lucide-react';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-200 to-pink-200 py-8 px-4 sm:px-6 lg:px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto">
        <div className="text-center mb-8">
          <Heart className="w-10 h-10 text-rose-600 mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Create a Digital Rose
          </h1>
          <p className="text-base text-rose-400">
            Solve a puzzle to show your affection! More thorns, more challenge.
            Once solved, your love gets a beautiful digital rose with your personal touch.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 sm:p-8">
          <RoseForm />
        </div>
      </div>
    </div>
  );
}
