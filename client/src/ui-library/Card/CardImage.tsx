import styles from './Card.module.scss';

interface CardImageProps {
  img: string;
  alt: string;
}

const CardImage = ({ img, alt }: CardImageProps) => {
  return (
    <div className={styles.cardImage}>
      <img src={img} alt={alt} />
    </div>
  );
};

export default CardImage;
