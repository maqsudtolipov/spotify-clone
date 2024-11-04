import styles from './Tabs.module.scss';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

const ArrowButton = ({ position = '', ...rest }) => {
  if (position === 'left') {
    return (
      <button
        className={`${styles.arrowButton} ${styles.arrowButtonLeft}`}
        {...rest}
      >
        <RiArrowLeftSLine />
        <div className={styles.shadow}></div>
      </button>
    );
  } else {
    return (
      <button
        className={`${styles.arrowButton} ${position === 'left' ? styles.arrowButtonLeft : styles.arrowButtonRight}`}
        {...rest}
      >
        <RiArrowRightSLine />
        <div className={styles.shadow}></div>
      </button>
    );
  }
};

export default ArrowButton;
