import styles from './NavButton.module.scss';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { RiHome4Fill, RiHome4Line } from 'react-icons/ri';

const NavButton = ({
  isTransparent = false,
  isSmall = false,
  rest,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHighlighted = location.pathname === '/';
  const className = `${styles.btn} ${isTransparent ? styles.transparent : ''} ${isSmall ? styles.small : ''}`;

  return (
    <div
      className={className}
      role="button"
      onClick={() => navigate('/')}
      {...rest}
    >
      {isHighlighted ? <RiHome4Fill className="text-white" /> : <RiHome4Line />}
    </div>
  );
};

export default NavButton;
