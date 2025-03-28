
import {createClient} from '../../ultis/supabase/client'
import { redirect } from 'next/navigation'


export default async function signUpNewUser(user) {
    const supabase = createClient()
 const {email,password,firstName,lastName,streetAddress,city,state,zipcode,phoneNumber} = user

    // console.log(user)
//   const supabase = createClient(supabaseUrl, supabaseAnonKey);
 
const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
    emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,   
      data: {
        first_name: firstName,
        last_name: lastName,
        street_address: streetAddress,
        city: city,
        state: state,
        zipcode: zipcode,
        phone_number: phoneNumber,
      },
    },
  });
// console.log('data',data, 'error', error)
//   return data,error;
redirect('/')
}
