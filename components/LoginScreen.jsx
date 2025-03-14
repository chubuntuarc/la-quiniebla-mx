import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './LoginScreen.module.css';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result.error) {
        setError(result.error);
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookLogin = () => {
    signIn('facebook', { callbackUrl: '/dashboard' });
  };

  const handleAppleLogin = () => {
    signIn('apple', { callbackUrl: '/dashboard' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.welcomeSection}>
        <h1>WELCOME</h1>
        <img 
          src="/quiniebla.webp" 
          alt="Quiniela Pro Logo" 
          className={styles.logo}
        />
      </div>

      <form onSubmit={handleLogin} className={styles.loginForm}>
        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <a href="/forgot-password" className={styles.forgotPassword}>
          Forgot password?
        </a>

        <button 
          type="submit" 
          className={styles.loginButton}
          disabled={isLoading}
        >
          {isLoading ? 'LOGGING IN...' : 'LOGIN'}
        </button>

        <div className={styles.socialLogin}>
          <p>or login with</p>
          <div className={styles.socialButtons}>
            <button 
              type="button" 
              className={styles.socialButton}
              onClick={handleFacebookLogin}
              disabled={isLoading}
            >
              <img src="/facebook-icon.png" alt="Facebook login" />
            </button>
            <button 
              type="button" 
              className={styles.socialButton}
              onClick={handleAppleLogin}
              disabled={isLoading}
            >
              <img src="/apple-icon.png" alt="Apple login" />
            </button>
          </div>
        </div>

        <p className={styles.terms}>
          By logging in, you are agreeing to the Terms of Service.
        </p>

        <div className={styles.signup}>
          <span>DON'T HAVE AN ACCOUNT? </span>
          <a href="/signup">SIGN UP</a>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen; 