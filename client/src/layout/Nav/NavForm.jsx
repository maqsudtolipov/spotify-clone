import styles from './NavForm.module.scss';
import { RiSearchLine } from 'react-icons/ri';

const NavForm = () => {
  return (
    <div className={styles.form}>
      <input type="text" placeholder="What do you want to play?" />
      <RiSearchLine />
    </div>
  );
};

export default NavForm;
