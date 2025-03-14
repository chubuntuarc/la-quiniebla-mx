import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './LoginScreen.module.css';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRequestCode = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('email', {
        email,
        redirect: false,
      });

      if (result.error) {
        setError(result.error);
      } else {
        setCodeSent(true);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        code,
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
        <img 
          src="/quiniebla.webp" 
          alt="Quiniela Pro Logo" 
          className={styles.logo}
        />
      </div>

      <form onSubmit={codeSent ? handleVerifyCode : handleRequestCode} className={styles.loginForm}>
        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Tu Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            disabled={codeSent}
          />
        </div>

        {codeSent && (
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Ingresa el codigo"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={styles.input}
            />
          </div>
        )}

        {error && <div className={styles.error}>{error}</div>}

        <button 
          type="submit" 
          className={styles.loginButton}
          disabled={isLoading}
        >
          {isLoading ? 'PROCESANDO...' : codeSent ? 'VERIFICAR CODIGO' : 'OBTENER CODIGO DE INICIO'}
        </button>

        {codeSent && (
          <button 
            type="button" 
            className={styles.resendButton}
            onClick={handleRequestCode}
            disabled={isLoading}
          >
            Reenviar codigo
          </button>
        )}

        {/* <div className={styles.socialLogin}>
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
        </div> */}

        <p className={styles.terms}>
          Al iniciar sesión, aceptas los Términos de Servicio.
        </p>

      </form>
    </div>
  );
};

export default LoginScreen; 