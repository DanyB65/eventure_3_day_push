// authOptions.js
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { neon } from '@neondatabase/serverless';

export  const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Email/Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        const sql = neon(process.env.DATABASE_URL);
        const result = await sql`
          SELECT * FROM users WHERE email = ${email}
        `;
        
        if (result.length === 0) {
          console.log("No user found");
          return null;
        }
        const user = result[0];
        console.log("Found user:", user);
        console.log("Password:", password, "Hashed password:", user.password);
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Password valid:", isPasswordValid);
        
        if (isPasswordValid) {
          return user;
        } else {
          console.log("Password mismatch");
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
};

