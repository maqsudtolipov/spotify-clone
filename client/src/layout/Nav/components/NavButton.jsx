import styles from './NavButton.module.scss';

const NavButton = ({
  isTransparent = false,
  isSmall = false,
  icon = 'icon is required',
  rest,
}) => {
  return (
    <button
      className={`${styles.btn} ${isTransparent ? styles.transparent : ''} ${isSmall ? styles.small : ''}`}
      role="button"
      {...rest}
    >
      {icon}
    </button>
  );
};

export default NavButton;
