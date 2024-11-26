import styles from './HistoryCard.module.scss';
import CardImage from './CardImage.tsx';

interface HistoryItem {
  img: string;
  name: string;
  type: ('artist' | 'playlist' | 'song')[];
}

interface HistoryCardProps {
  data: HistoryItem;
}

const HistoryCard = ({ data }: HistoryCardProps) => {
  return (
    <div className={styles.historyCard}>
      <CardImage src={data.img} alt={data.name} />
      <span>{data.name}</span>
    </div>
  );
};

export default HistoryCard;
