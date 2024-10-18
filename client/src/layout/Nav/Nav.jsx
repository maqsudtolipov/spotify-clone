import styles from './Nav.module.scss';
import NavButton from './NavButton.jsx';
import NavForm from './NavForm.jsx';
import Button from '../../components/Button/Button.jsx';
import { RiHome4Line, RiNotification3Line } from 'react-icons/ri';
import Avatar, { AvatarFallback } from '../../components/Avatar/Avatar.jsx';
import NavTooltip from './NavTooltip.jsx';
import Dropdown from '../../components/Dropdown/Dropdown.jsx';
import useOutsideClick from '../../hooks/useOutsideClick.jsx';

const Nav = () => {
  useOutsideClick();

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

        <Dropdown>
          <Dropdown.Trigger>
            <NavTooltip
              trigger={
                <Avatar>
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
              }
              position="bottom-left"
              content="Maqsud Tolipov"
            />
          </Dropdown.Trigger>

          <Dropdown.List>
            <Dropdown.Item>Home</Dropdown.Item>
            <Dropdown.Item>Profile</Dropdown.Item>
            <Dropdown.Item underline={true}>Settings</Dropdown.Item>
            <Dropdown.Item>Logout</Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </div>
    </div>
  );
};

export default Nav;
