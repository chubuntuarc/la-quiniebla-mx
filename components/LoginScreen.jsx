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
      const response = await fetch('/api/auth/request-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to send verification code');
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
      // First verify the code with our API
      const verifyResponse = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });

      if (!verifyResponse.ok) {
        const errorData = await verifyResponse.text();
        setError('Código inválido. Por favor verifique e intente de nuevo.');
        return;
      }

      // If verification successful, proceed with sign in
      const result = await signIn('credentials', {
        email,
        code,
        redirect: false,
      });

      console.log('Auth result:', result);

      if (result?.error) {
        if (result.error === 'Authentication failed') {
          setError('La sesión no pudo ser iniciada. Por favor intente de nuevo.');
        } else {
          setError(`Error: ${result.error}`);
        }
        return;
      }

      if (result?.ok) {
        await router.push('/');
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError('Error de conexión. Por favor intente de nuevo.');
    } finally {
      setIsLoading(false);
    }
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