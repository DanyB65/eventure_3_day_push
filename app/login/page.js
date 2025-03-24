'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call NextAuth.js to handle the login
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password');
    } else {
      router.push('/'); // Redirect to home page on successful login
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '20px' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ display: 'block' }}>
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password" style={{ display: 'block' }}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={{ padding: '8px 16px' }}>
            Login
          </button>
          <Link href="/signup" legacyBehavior>
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
              Sign Up Here!
            </a>
          </Link>
        </div>
      </form>
    </div>
  );
}
