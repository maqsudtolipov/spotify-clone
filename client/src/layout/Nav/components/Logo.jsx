import styles from '../Nav.module.scss';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className={styles.logo}>
      Spotify Clone
    </Link>
  );
};

export default Logo;
