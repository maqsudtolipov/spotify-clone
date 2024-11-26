import styles from './Card.module.scss';
import CardImage from './CardImage.tsx';

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
  return (
    <div className={styles.card}>
      <CardImage img={data.img} alt={data.name} />
      <span>{data.name}</span>
    </div>
  );
};

export default Card;
