import styles from './LibraryCard.module.scss';
import { RiPlayLargeFill } from 'react-icons/ri';

interface CardImageProps {
  src: string;
  name: string;
  isArtist?: boolean;
  onClick?: () => void;
}

const CardImage = ({ src, name, isArtist, onClick }: CardImageProps) => {
  return (
    <div className={styles.cardImageContainer} onClick={onClick}>
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
