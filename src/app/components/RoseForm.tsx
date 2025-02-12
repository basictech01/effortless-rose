"use client";
import React from 'react';
import { useRouter } from 'next/navigation'
import type { RoseFormData } from '../types';

export function RoseForm() {
  const router = useRouter();
  const [formData, setFormData] = React.useState<RoseFormData>({
    name: '',
    message: '',
    difficulty: 1
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/game?name=' + formData.name + '&message=' + formData.message + '&difficulty=' + formData.difficulty);
  };


  return (<div className="flex flex-col items-center justify-center bg-pink-50 shadow rounded-lg p-6 sm:p-8">
    
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md p-4 bg-white rounded-lg shadow-lg transform transition-all hover:scale-105">
        <h1 className="text-2xl font-bold text-center text-rose-600">Rose Challenge</h1>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-rose-700">Recipient&lsquo;s Name</label>
          <input
            type="text"
            id="name"
            required
            className="mt-1 block w-full rounded-md border-rose-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 text-rose-700 placeholder-rose-300"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter recipient's name"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-rose-700">Message</label>
          <textarea
            id="message"
            required
            maxLength={500}
            className="mt-1 block w-full rounded-md border-rose-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 text-rose-700 placeholder-rose-300"
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            placeholder="Enter a message for your beloved..."
          />
        </div>

        <div>
          <label htmlFor="thornsCount" className="block text-sm font-medium text-rose-700 mb-1">
            Number of Thorns
          </label>
          <input
            type="range"
            id="thornsCount"
            min="1"
            max="8"
            value={formData.difficulty}
            onChange={(e) => setFormData({ ...formData, difficulty: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Easy</span>
            <span>Hard</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-all transform hover:scale-105"
        >
          Create Rose Challenge
        </button>
      </form>
    </div>
  );
}
