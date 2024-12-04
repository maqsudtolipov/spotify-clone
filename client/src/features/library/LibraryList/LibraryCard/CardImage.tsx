import styles from './LibraryCard.module.scss';
import { RiPlayLargeFill } from 'react-icons/ri';

interface CardImageProps {
  src: string;
  name: string;
  isArtist?: boolean;
}

const CardImage = ({ src, name, isArtist }: CardImageProps) => {
  return (
    <div className={styles.cardImageContainer}>
      <img
        className={`${styles.cardImage} ${isArtist ? styles.cardImageRounded : ''}`}
        src={src}
        alt={name}
      />
      <RiPlayLargeFill />
    </div>
  );
};

export default CardImage;
