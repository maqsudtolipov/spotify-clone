import styles from './Nav.module.scss';
import NavButton from './NavButton.jsx';
import NavForm from './NavForm.jsx';
import Button from '../../components/Button/Button.jsx';
import { RiHome4Line, RiNotification3Line } from 'react-icons/ri';
import Avatar, { AvatarFallback } from '../../components/Avatar/Avatar.jsx';
import NavTooltip from './NavTooltip.jsx';

const Nav = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.logo}>Spotify</div>

      <div className={styles.nav__center}>
        <NavTooltip
          trigger={<NavButton icon={<RiHome4Line />} />}
          position="bottom"
          content="Menu"
        />
        <NavForm />
      </div>

      <div className="flex items-center gap-4">
        <Button>Login</Button>

        <NavTooltip
          trigger={
            <NavButton
              isTransparent={true}
              isSmall={true}
              icon={<RiNotification3Line />}
            />
          }
          position="bottom"
          content="Whats New"
        />
        <NavTooltip
          trigger={
            <Avatar>
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
          }
          position="bottom-left"
          content="Maqsud Tolipov"
        />
      </div>
    </div>
  );
};

export default Nav;
