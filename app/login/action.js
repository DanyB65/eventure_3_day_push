// // import { supabase } from "../ultis/supabase/server"
// import {createClient} from '../ultis/supabase/server'
// import { redirect } from 'next/navigation'

// export  async function signInWithEmail(user) {
//     const supabase = await createClient()
//     const {email,password} = user
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email: email,
//       password: password,
//     })
//     console.log('data',data, 'error', error)
//     redirect('/')
//     return {data,error}
//   }
// action.js
'use server';

import { createClient } from '../../ultis/supabase/server';
import { redirect } from 'next/navigation';

export async function signInWithEmail(formData) {
// Retrieve the internal state array from formData
const symbols = Object.getOwnPropertySymbols(formData);
const stateSymbol = symbols.find(sym => sym.toString() === 'Symbol(state)');
const internalState = formData[stateSymbol];

// Access the second and third objects
const email = internalState[1].value; // { name: 'email', value: 'XXXXX' }
const password = internalState[2].value;  // { name: 'password', value: 'XXXXX' }
// console.log(email, password);


  
  // Initialize your server-side Supabase client
  const supabase =await createClient();
  
  // Attempt to sign in
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
//   console.log('Login data:', data, 'Error:', error);
  
  // If there is an error, redirect to an error page
  if (error) {
    // You might want to handle errors more gracefully (for example, by showing a message)
    redirect('/error');
  }
  
  // On success, redirect to the home page
  redirect('/');
}
