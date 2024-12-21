import styles from './Login.module.scss';
import AuthContainer from './AuthContainer.tsx';

const Login = () => {
  return (
    <AuthContainer>
      <form className={styles.form} action="">
        <p className={styles.title}>Spotify</p>

        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Enter your email"
        />
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Enter your password"
        />

        <button className={styles.button} type="submit">
          Login
        </button>
      </form>
    </AuthContainer>
  );
};

export default Login;
