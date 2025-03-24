'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { z } from 'zod';
import Link from 'next/link';
import { signUpAction } from './action';

// Zod validation schema
const signUpSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email format' }),
    confirmEmail: z.string().email({ message: 'Invalid email format' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: 'Emails do not match',
    path: ['confirmEmail'],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });


export default function SignUp() {
  const [clientErrors, setClientErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    // Collect form data manually
    const formData = {
      email,
      confirmEmail,
      password,
      confirmPassword,
    };
    // console.log('formData front end',formData)
// console.log('formData front end',formData)
    // Validate form data using Zod
    const result = signUpSchema.safeParse(formData);
    if (!result.success) {
      setClientErrors(result.error.flatten().fieldErrors);
      return;
    }

    setClientErrors({});

    try {
      // Create user in the database using signUpAction (this is your server-side logic)
    //   console.log('formData before newUser end',formData)
      const newUser = await signUpAction(formData);
    //   console.log('newUser',newUser)
    const user = newUser[0];
// console.log(user)
      // Once user is created, sign them in
      const res = await signIn('credentials', {
        email: user.email,
        password: user.password,
        redirect: false, // Don't automatically redirect after login
      });
console.log('res',res)
      if (res?.error) {
        setClientErrors({ general: 'Something went wrong during sign up' });
        console.log('Error signing in after sign up', res.error);
      } else {
        router.push('/'); // Redirect to home after successful sign-up and login
      }
    } catch (error) {
      setClientErrors({ general: 'Something went wrong during sign up' });
    }
  }

//   console.log('form data', email, password, confirmEmail, confirmPassword);
  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '20px' }}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ display: 'block' }}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
          {clientErrors.email && (
            <span style={{ color: 'red', fontSize: '0.9rem' }}>
              {clientErrors.email.join(', ')}
            </span>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="confirmEmail" style={{ display: 'block' }}>Confirm Email:</label>
          <input
            type="email"
            id="confirmEmail"
            name="confirmEmail"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
          {clientErrors.confirmEmail && (
            <span style={{ color: 'red', fontSize: '0.9rem' }}>
              {clientErrors.confirmEmail.join(', ')}
            </span>
          )}
        </div>

        {/* Password */}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password" style={{ display: 'block' }}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
          {clientErrors.password && (
            <span style={{ color: 'red', fontSize: '0.9rem' }}>
              {clientErrors.password.join(', ')}
            </span>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="confirmPassword" style={{ display: 'block' }}>Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
          {clientErrors.confirmPassword && (
            <span style={{ color: 'red', fontSize: '0.9rem' }}>
              {clientErrors.confirmPassword.join(', ')}
            </span>
          )}
        </div>

        {clientErrors.general && (
          <span style={{ color: 'red', fontSize: '0.9rem' }}>
            {clientErrors.general}
          </span>
        )}

        <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
          <button type="submit" style={{ padding: '8px 16px' }}>
            Sign Up
          </button>
          <Link href="/login" legacyBehavior>
            <a
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                backgroundColor: '#0070f3',
                color: '#fff',
                borderRadius: '4px',
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              Back to Login
            </a>
          </Link>
        </div>
      </form>
    </div>
  );
}
