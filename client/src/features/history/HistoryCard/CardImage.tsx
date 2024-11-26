import styles from './HistoryCard.module.scss';
import { RiPlayCircleFill } from 'react-icons/ri';

interface CardImageProps {
  src: string;
  alt: string;
}

const CardImage = ({ src, alt }: CardImageProps) => {
  return (
    <div className={styles.cardImage}>
      <img src={src} alt={alt} />
      <RiPlayCircleFill />
    </div>
  );
};

export default CardImage;
