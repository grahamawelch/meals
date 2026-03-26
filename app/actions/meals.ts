'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export interface Meal {
  id: string;
  name: string;
  created_at: string;
}

export async function getRecentMeals(limit = 5): Promise<Meal[]> {
  const { data, error } = await supabase
    .from<Meal>('meals')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

export async function addMeal(formData: FormData) {
  const name = formData.get('name');

  if (typeof name !== 'string' || !name.trim()) {
    throw new Error('Meal name is required');
  }

  const trimmed = name.trim();

  const { data, error } = await supabase
    .from<Meal>('meals')
    .insert({ name: trimmed })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('Failed to create meal');
  }

  revalidatePath('/');

  return data;
}

