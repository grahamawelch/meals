'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Meal {
  id: string;
  name: string;
  created_at: string;
}

export default function RecentMeals() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecentMeals();
  }, []);

  const fetchRecentMeals = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('meals')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setMeals(data || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
          Recent Meals
        </h2>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
          Recent Meals
        </h2>
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 dark:bg-red-900 dark:border-red-700 dark:text-red-100">
          Error loading meals: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
        Recent Meals
      </h2>
      {meals.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">No meals added yet.</p>
      ) : (
        <div className="space-y-3">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700"
            >
              <span className="text-zinc-900 dark:text-zinc-100 font-medium">
                {meal.name}
              </span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {new Date(meal.created_at).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}