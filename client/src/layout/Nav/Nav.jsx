import styles from './Nav.module.scss';
import NavButton from './NavButton.jsx';

const Nav = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.logo}>Spotify</div>

      <div>
        <NavButton />
      </div>
      <div>profile</div>
    </div>
  );
};

export default Nav;
