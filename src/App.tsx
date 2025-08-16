import { ComponentType, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

export const App: ComponentType = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading authentication...</div>;
  }

  return (
    <div>
      <header>
        <h1>Cloud Retail App</h1>
        {currentUser ? (
          <>
            <p>Welcome, {currentUser.email}!</p>
            <button onClick={() => auth.signOut()}>Sign Out</button>
          </>
        ) : (
          <p>You are not signed in.</p>
        )}
      </header>
      <main>
        {currentUser ? (
          <div>
            <h3>Protected Content Here!</h3>
            <p>Only logged-in users can see this.</p>
          </div>
        ) : (
          <>
            <p>Please sign in or sign up to access features.</p>
            <SignInForm />
            <SignUpForm />
          </>
        )}
      </main>
    </div>
  );
};
