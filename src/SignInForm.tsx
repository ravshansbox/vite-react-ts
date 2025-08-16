import { ComponentType, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

export const SignInForm: ComponentType = () => {
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
          const { user } = await signInWithEmailAndPassword(
            auth,
            email,
            password,
          );
          console.log('User signed in successfully:', user);
          setSuccess('Sign-in successful! Welcome back!');
        } catch (error) {
          console.error('Error signing in:', error.message);
          setError(error.message);
        }
      }}
    >
      <h2>Sign In</h2>
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
      <button type="submit">Sign In</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};
