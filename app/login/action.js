

'use server';

import { createClient } from '../../ultis/supabase/server';
import { redirect } from 'next/navigation';

export async function signInWithEmail(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // Instead of redirecting, return the error message.
    return { error: error.message };
  }

  // On success, you might redirect or return a success indicator.
  redirect('/');
}
