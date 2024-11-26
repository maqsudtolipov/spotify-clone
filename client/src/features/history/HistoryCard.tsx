import styles from './HistoryCard.module.scss';

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
      <img src={data.img} alt={data.name} />
    </div>
  );
};

export default HistoryCard;
