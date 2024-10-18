import styles from './Nav.module.scss';
import Logo from './components/Logo.jsx';
import CenterNav from './components/CenterNav.jsx';
import UserActions from './components/UserActions.jsx';

const Nav = () => {
  return (
    <div className={styles.nav}>
      <Logo />
      <CenterNav />
      <UserActions />
    </div>
  );
};

export default Nav;
