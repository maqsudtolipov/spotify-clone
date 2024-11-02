import styles from './ButtonIcon.module.scss';

const ButtonIcon = ({ children, ...rest }) => {
  return (
    <button className={styles.button} {...rest}>
      {children}
    </button>
  );
};

export default ButtonIcon;
