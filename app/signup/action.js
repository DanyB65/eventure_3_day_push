
// "use server";
// import { neon } from "@neondatabase/serverless";
// import bcrypt from "bcryptjs";
// import z from "zod";
// import { createSession } from "../../lib/session";


// const signUpSchema = z.object({
//   email: z.string().email(),
//   confirmEmail: z.string().email(),
//   password: z.string().min(8),
//   confirmPassword: z.string().min(8),
// });
// export async function signUpAction(formData) {
//     // console.log("formData back end", formData);
// //    const data = Object.fromEntries(formData);
// const data = formData
// console.log('formData back end',data)
// //   console.log("formData", data);

//   const validationResults = signUpSchema.safeParse({
//     email: data.email,
//     confirmEmail: data.confirmEmail,
//     password: data.password,
//     confirmPassword: data.confirmPassword,
//   });
// // console.log(validationResults.error.flatten().fieldErrors)
//   if (!validationResults.success) {
//     return {
//       errors: validationResults.error.flatten().fieldErrors,
//     };
//   }
//   // console.log('formData',data)
//   // Initialize the Neon SQL client using your DATABASE_URL
//   const sql = neon(process.env.DATABASE_URL);

//   // Static test data
//   const email = data.email;
//   const password = data.password;

//   // Hash the password before storing it
//   const hashedPassword = await bcrypt.hash(password, 10);

//   console.log("Before query");
//   const result = await sql`
//       INSERT INTO users (email, password)
//       VALUES (${email}, ${hashedPassword})
//       RETURNING *;
//   `;

// //   await createSession(result.id);
//   console.log("After query");
//   console.log("Test insert result:", result);
  
//   return result;
// }
// // import { createClient } from '../ultis/supabase/client'
// import { createClient } from '@supabase/supabase-js'
// export default  async function signUpNewUser(){
// const supabase = await createClient();
// const { data, error } = await supabase.auth.signUp({
//     email: 'valid.email@supabase.io',
//     password: 'example-password',
//     options: {
//       data: {
//         first_name: 'John',
//         last_name: 'Doe',
//         street_address: '123 Main St.',
//         city: 'Magic City',
//         state: 'MA',
//         zipcode: '12345',
//         phone_number: '555-555-5555',
//       },
//     },
//   })

//   return data
// }


// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error("Supabase environment variables are missing.");
// }
import {supabase} from '../ultis/supabase/client'

export default async function signUpNewUser(user) {
 const {email,password,firstName,lastName,streetAddress,city,state,zipcode,phoneNumber} = user

    // console.log(user)
//   const supabase = createClient(supabaseUrl, supabaseAnonKey);
 
const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
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
console.log('data',data, 'error', error)
  return data,error;
}
