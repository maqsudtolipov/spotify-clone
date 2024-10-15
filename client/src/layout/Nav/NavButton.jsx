import styles from './NavButton.module.scss';
import { RiHome4Fill } from 'react-icons/ri';

const NavButton = () => {
  return (
    <button className={styles.btn} role="button">
      <RiHome4Fill />
    </button>
  );
};

export default NavButton;
