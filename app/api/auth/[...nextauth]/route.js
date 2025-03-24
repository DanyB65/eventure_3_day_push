'use server'

import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { neon } from '@neondatabase/serverless';  // Your database client

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Email/Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        // Retrieve user from the database
        const sql = neon(process.env.DATABASE_URL);
        const result = await sql`
          SELECT * FROM users WHERE email = ${email}
        `;
        
        if (result.length === 0) {
          console.log("No user found");
          return null; // No user found with this email
        }
        // console.log("userrrrr:",result)
        const user = result[0]; // Assuming the user is in the first row
        
        console.log("Found user:", user);
        console.log("Password:",
          password,
          "Hashed password:",
          user.password
        );
        // Compare the entered password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Password valid:", isPasswordValid
        );

        if (isPasswordValid) {
          return user; // If credentials are correct, return the user object
        } else {
          console.log("Password mismatch");
          return null; // Return null if authentication fails
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Store session in a JWT
  },
  pages: {
    signIn: '/login', // Custom sign-in page
  },
})

export { handler as GET, handler as POST }
