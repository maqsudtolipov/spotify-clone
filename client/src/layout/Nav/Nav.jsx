import styles from './Nav.module.scss';
import NavButton from './NavButton.jsx';
import NavForm from './NavForm.jsx';
import Button from '../../components/Button/Button.jsx';
import { RiHome4Line, RiNotification3Line } from 'react-icons/ri';
import Avatar, { AvatarFallback } from '../../components/Avatar/Avatar.jsx';
import Tooltip from '../../components/Tooltip/Tooltip.jsx';

// TODO: Needs better refactoring for readability, maybe folder for component references? Or hook maybe?
const Nav = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.logo}>Spotify</div>

      <div className={styles.nav__center}>
        <Tooltip>
          <Tooltip.Trigger>
            <NavButton icon={<RiHome4Line />} />
          </Tooltip.Trigger>
          <Tooltip.Content position="bottom">Home</Tooltip.Content>
        </Tooltip>

        <NavForm />
      </div>

      <div className="flex items-center gap-4">
        <Button>Login</Button>

        <Tooltip>
          <Tooltip.Trigger>
            <NavButton
              isTransparent={true}
              isSmall={true}
              icon={<RiNotification3Line />}
            />
          </Tooltip.Trigger>
          <Tooltip.Content position="bottom">Whats New</Tooltip.Content>
        </Tooltip>

        <Tooltip>
          <Tooltip.Trigger>
            <Avatar>
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
          </Tooltip.Trigger>
          <Tooltip.Content position="bottom-left">
            Maqsud Tolipov
          </Tooltip.Content>
        </Tooltip>
      </div>
    </div>
  );
};

export default Nav;
