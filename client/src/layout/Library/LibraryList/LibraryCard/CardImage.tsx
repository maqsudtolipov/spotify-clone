import styles from './LibraryCard.module.scss';

interface CardImageProps {
  src: string;
  name: string;
}

const CardImage = ({ src, name }: CardImageProps) => {
  return <img className={styles.cardImage} src={src} alt={name} />;
};

export default CardImage;
