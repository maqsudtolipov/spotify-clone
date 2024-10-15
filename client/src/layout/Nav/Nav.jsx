import styles from './Nav.module.scss';

const Nav = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.logo}>Spotify</div>
      <div>nav</div>
      <div>profile</div>
    </div>
  );
};

export default Nav;
