
"use server";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import z from "zod";
import { createSession } from "../../lib/session";


const signUpSchema = z.object({
  email: z.string().email(),
  confirmEmail: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});
export async function signUpAction(formData) {
    // console.log("formData back end", formData);
//    const data = Object.fromEntries(formData);
const data = formData
console.log('formData back end',data)
//   console.log("formData", data);

  const validationResults = signUpSchema.safeParse({
    email: data.email,
    confirmEmail: data.confirmEmail,
    password: data.password,
    confirmPassword: data.confirmPassword,
  });
// console.log(validationResults.error.flatten().fieldErrors)
  if (!validationResults.success) {
    return {
      errors: validationResults.error.flatten().fieldErrors,
    };
  }
  // console.log('formData',data)
  // Initialize the Neon SQL client using your DATABASE_URL
  const sql = neon(process.env.DATABASE_URL);

  // Static test data
  const email = data.email;
  const password = data.password;

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("Before query");
  const result = await sql`
      INSERT INTO users (email, password)
      VALUES (${email}, ${hashedPassword})
      RETURNING *;
  `;

//   await createSession(result.id);
  console.log("After query");
  console.log("Test insert result:", result);
  
  return result;
}
