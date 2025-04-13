import styles from './CardsList.module.scss';
import Card from '../Card/Card.tsx';
import Heading2 from '../Typography/Heading2.tsx';

interface CardDate {
  img: string;
  name: string;
  description: string;
  type: string;
}

interface CardsListProps {
  title?: string;
  shrink?: boolean;
  items: CardDate[];
  type: 'artist' | 'playlist' | 'user' | 'song';
}

const CardsList = ({ title, shrink = false, items, type }: CardsListProps) => {
  return (
    <div className={styles.cardsListContainer}>
      {title && <Heading2>{title}</Heading2>}

      <ul className={`${styles.cardsList} ${shrink ? styles.shrink : ''}`}>
        {items && items.map((el) => <Card key={el.id} data={el} type={type} />)}
      </ul>
    </div>
  );
};

export default CardsList;
