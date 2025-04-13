import styles from './Card.module.scss';
import { RiPlayLargeFill } from 'react-icons/ri';

interface CardImageProps {
  img: string;
  alt: string;
  isRounded: boolean;
}

const CardImage = ({ img, alt, isRounded }: CardImageProps) => {
  return (
    <div
      className={`${styles.cardImage} ${isRounded ? styles.cardImageRounded : ''}`}
    >
      <img src={img} alt={alt} />
      <div className={styles.gradient}></div>
      <RiPlayLargeFill className={styles.imageIcon} />
    </div>
  );
};

export default CardImage;
