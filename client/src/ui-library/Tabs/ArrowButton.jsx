import styles from './Tabs.module.scss';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

const ArrowButton = ({ position = '', ...rest }) => {
  const isLeft = position === 'left';
  const icon = isLeft ? <RiArrowLeftSLine /> : <RiArrowRightSLine />;
  const buttonClass = `${styles.arrowButton} ${isLeft ? styles.arrowButtonLeft : styles.arrowButtonRight}`;

  return (
    <button className={buttonClass} {...rest}>
      {icon}
    </button>
  );
};

export default ArrowButton;
