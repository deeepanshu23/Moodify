import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [pin, setPin] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (pin === '8265' || pin === '9999') {
      onLogin();
    } else {
      alert('Incorrect PIN');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter PIN:
        <input
          type="password"
          value={pin}
          onChange={e => setPin(e.target.value)}
          maxLength={4}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}