// pages/login.js
import React from 'react';

export default function Login() {
  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '20px' }}>
      <h1>Login</h1>
      <form>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="username" style={{ display: 'block' }}>Username:</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password" style={{ display: 'block' }}>Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{ padding: '8px 16px' }}>Login</button>
      </form>
    </div>
  );
}
