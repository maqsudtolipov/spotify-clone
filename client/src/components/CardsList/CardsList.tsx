import styles from './CardsList.module.scss';
import Card from '../../ui-library/Card/Card.tsx';
import Heading2 from '../../ui-library/Typography/Heading2.tsx';

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
}

const CardsList = ({ title, shrink = false, items }: CardsListProps) => {
  return (
    <div className={styles.cardsListContainer}>
      {title && <Heading2>{title}</Heading2>}
      <ul className={`${styles.cardsList} ${shrink ? styles.shrink : ''}`}>
        {items && items.map((el) => <Card key={el.name} data={el} />)}
      </ul>
    </div>
  );
};

export default CardsList;
