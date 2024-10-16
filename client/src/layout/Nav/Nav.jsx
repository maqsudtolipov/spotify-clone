import styles from './Nav.module.scss';
import NavButton from './NavButton.jsx';
import NavForm from './NavForm.jsx';
import Button from '../../components/Button/Button.jsx';
import { RiHome4Line, RiNotification3Line } from 'react-icons/ri';
import Avatar, { AvatarFallback } from '../../components/Avatar/Avatar.jsx';

const Nav = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.logo}>Spotify</div>

      <div className={styles.nav__center}>
        <NavButton icon={<RiHome4Line />} />
        <NavForm />
      </div>

      <div className="flex items-center gap-4">
        <Button>Login</Button>
        <NavButton
          isTransparent={true}
          isSmall={true}
          icon={<RiNotification3Line />}
        />
        <Avatar>
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Nav;
