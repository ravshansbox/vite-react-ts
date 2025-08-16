import { ComponentType, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

export const SignUpForm: ComponentType = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        try {
          const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
          );
          console.log('User signed up successfully:', user);
          setSuccess('Sign-up successful! Welcome!');
        } catch (error) {
          console.error('Error signing up:', error.message);
          setError(error.message);
        }
      }}
    >
      <h2>Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <button type="submit">Sign Up</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};
