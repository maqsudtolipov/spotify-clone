import styles from '../Nav.module.scss';
import NavTooltip from './NavTooltip.jsx';
import NavButton from './NavButton.jsx';
import { RiHome4Line } from 'react-icons/ri';
import NavForm from '../../../features/search/components/input/NavForm.jsx';

const CenterNav = () => {
  return (
    <div className={styles.nav__center}>
      <NavTooltip
        trigger={<NavButton icon={<RiHome4Line />} />}
        position="bottom"
        content="Menu"
      />
      <NavForm />
    </div>
  );
};

export default CenterNav;
