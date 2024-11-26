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
  return (
    <div className={styles.card}>
      <CardImage img={data.img} alt={data.name} />
      <CardDescription name={data.name} description={data.description} />
    </div>
  );
};

export default Card;
