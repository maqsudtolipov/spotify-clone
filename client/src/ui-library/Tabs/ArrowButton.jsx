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
      </button>
    );
  } else {
    return (
      <button
        className={`${styles.arrowButton} ${position === 'left' ? styles.arrowButtonLeft : styles.arrowButtonRight}`}
        {...rest}
      >
        <RiArrowRightSLine />
      </button>
    );
  }
};

export default ArrowButton;
