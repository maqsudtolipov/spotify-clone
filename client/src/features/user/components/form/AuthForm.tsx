import styles from './AuthForm.module.scss';
import { FormEvent, ReactNode } from 'react';
import { RiLoaderFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

interface AuthFormProps {
  isLoading: boolean;
  buttonText: string;
  link?: { text: string; to: string };
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

const AuthForm = ({
  isLoading,
  buttonText,
  link,
  onSubmit,
  children,
}: AuthFormProps) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <p className={styles.title}>Spotify</p>

      {children}

      <button className={styles.button} type="submit">
        {isLoading && <RiLoaderFill />}
        {buttonText}
      </button>

      {link && (
        <Link className={styles.link} to={link.to}>
          {link.text}
        </Link>
      )}
    </form>
  );
};

export default AuthForm;
