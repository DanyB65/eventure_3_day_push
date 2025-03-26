// import { supabase } from "../ultis/supabase/server"
import {supabase} from '../ultis/supabase/client'
// import { redirect } from 'next/navigation'

export  async function signInWithEmail(user) {
    const {email,password} = user
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    console.log('data',data, 'error', error)
    // redirect('/')
    return data,error
  }