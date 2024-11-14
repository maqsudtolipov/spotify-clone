import styles from './IconButton.module.scss';

const IconButton = ({ children, ...rest }) => {
  return (
    <button className={styles.button} {...rest}>
      {children}
    </button>
  );
};

export default IconButton;
