// pages/signup.js
import React from 'react';

export default function SignUp() {
  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '20px' }}>
      <h1>Sign Up</h1>
      <form>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ display: 'block' }}>Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            style={{ width: '100%', padding: '8px' }} 
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="confirmEmail" style={{ display: 'block' }}> Confirm Email:</label>
          <input 
            type="email" 
            id="confirmEmail" 
            name="confirmEmail" 
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
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="confirmPassword" style={{ display: 'block' }}>Confirm Password:</label>
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword" 
            style={{ width: '100%', padding: '8px' }} 
          />
        </div>
        <button type="submit" style={{ padding: '8px 16px' }}>Sign Up</button>
      </form>
    </div>
  );
}
