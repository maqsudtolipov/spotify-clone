import styles from './Card.module.scss';
import CardImage from './CardImage.tsx';
import CardDescription from './CardDescription.tsx';

interface CardData {
  img: string;
  name: string;
  description: string;
  type: string;
}

interface CardProps {
  data: CardData;
}

const Card = ({ data }: CardProps) => {
  const { img, name, description, type } = data;

  return (
    <li className={styles.card}>
      <CardImage img={img.url} alt={name} isRounded={type === 'artist'} />
      <CardDescription name={name} description={description} />
    </li>
  );
};

export default Card;
