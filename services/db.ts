
import { User } from '../types.ts';
import { supabase } from './supabase.ts';

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116: "The result contains 0 rows"
    console.error('Error fetching user by email:', error);
    return null;
  }
  
  return data;
};

export const getUserById = async (id: string): Promise<User | null> => {
    const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching user by ID:', error);
    return null;
  }

  return data;
}

export const createUser = async (user: User): Promise<User | null> => {
  // First, check if user already exists to provide a cleaner error.
  const existingUser = await getUserByEmail(user.email);
  if (existingUser) {
    return null; // Indicates user already exists
  }
  
  const { data, error } = await supabase
    .from('users')
    .insert(user)
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error);
    return null;
  }

  return data;
};

export const updateUser = async (user: User): Promise<User | null> => {
    const { id, ...updateData } = user; // Destructure to separate id from the rest of the data
    const { data, error } = await supabase
    .from('users')
    .update(updateData) // Only pass the data that should be updated
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating user:', error);
    return null;
  }
  
  return data;
};