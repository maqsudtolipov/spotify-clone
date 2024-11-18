import styles from './LibraryCard.module.scss';
import { RiPlayLargeFill } from 'react-icons/ri';

interface CardImageProps {
  src: string;
  name: string;
}

const CardImage = ({ src, name }: CardImageProps) => {
  return (
    <div className={styles.cardImageContainer}>
      <img className={styles.cardImage} src={src} alt={name} />
      <RiPlayLargeFill />
    </div>
  );
};

export default CardImage;
