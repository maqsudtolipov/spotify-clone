import styles from './HistoryCard.module.scss';

interface CardImageProps {
  src: string;
  alt: string;
}

const CardImage = ({ src, alt }: CardImageProps) => {
  return (
    <div className={styles.cardImage}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default CardImage;
