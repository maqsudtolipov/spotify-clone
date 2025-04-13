import styles from './NavButton.module.scss';
import { Link, useNavigate } from 'react-router-dom';

const NavButton = ({
  isTransparent = false,
  isSmall = false,
  icon = 'icon is required',
  rest,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${styles.btn} ${isTransparent ? styles.transparent : ''} ${isSmall ? styles.small : ''}`}
      role="button"
      onClick={() => navigate('/')}
      {...rest}
    >
      {icon}
    </div>
  );
};

export default NavButton;
