import styles from './Card.module.scss';

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
    </div>
  );
};

export default CardImage;
