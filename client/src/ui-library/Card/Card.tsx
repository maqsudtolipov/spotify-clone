import styles from './Card.module.scss';
import CardImage from './CardImage.tsx';
import CardDescription from './CardDescription.tsx';

interface Card {
  img: string;
  name: string;
  description: string;
  type: string;
}

interface CardProps {
  data: Card;
}

const Card = ({ data }: CardProps) => {
  const { img, name, description, type } = data;

  return (
    <div className={styles.card}>
      <CardImage img={img} alt={name} isRounded={type === 'artist'} />
      <CardDescription name={name} description={description} />
    </div>
  );
};

export default Card;
