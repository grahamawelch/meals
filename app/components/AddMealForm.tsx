'use client';

import { FormEvent, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AddMealForm() {
  const [mealName, setMealName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!mealName.trim()) {
        setError('Meal name is required');
        setIsLoading(false);
        return;
      }

      const { data, error: insertError } = await supabase
        .from('meals')
        .insert({ name: mealName.trim() })
        .select();

      if (insertError) {
        setError(insertError.message);
      } else {
        setSuccess(true);
        setMealName('');
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="mealName" className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">
            Meal Name
          </label>
          <input
            id="mealName"
            type="text"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            placeholder="Enter meal name..."
            disabled={isLoading}
            className="w-full px-4 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-100 disabled:opacity-50"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 dark:bg-red-900 dark:border-red-700 dark:text-red-100">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-100">
            Meal added successfully!
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Adding...' : 'Add Meal'}
        </button>
      </div>
    </form>
  );
}
