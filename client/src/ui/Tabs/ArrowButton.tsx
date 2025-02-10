import styles from './ArrowButton.module.scss';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

interface ArrowButtonProps {
  position: 'left' | 'right';
  onClick?: () => void;
}

const ArrowButton = ({ position, onClick }: ArrowButtonProps) => {
  const isLeft = position === 'left';
  const icon = isLeft ? <RiArrowLeftSLine /> : <RiArrowRightSLine />;
  const buttonClass = `${styles.arrowButton} ${isLeft ? styles.arrowButtonLeft : styles.arrowButtonRight}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {icon}
    </button>
  );
};

export default ArrowButton;
