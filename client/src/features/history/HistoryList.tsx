import styles from './HistoryList.module.scss';
import HistoryCard from './HistoryCard/HistoryCard.tsx';
import { HistoryItem } from './History.tsx';

interface HistoryListProps {
  items?: HistoryItem[];
  handleNewColor: () => void;
}

const HistoryList = ({ items, handleNewColor }: HistoryListProps) => {
  return items?.length ? (
    <ul className={styles.historyList} onMouseEnter={handleNewColor}>
      {items.map((el) => (
        <HistoryCard data={el} handleNewColor={handleNewColor} />
      ))}
    </ul>
  ) : (
    <span>There are no items with current filter.</span>
  );
};

export default HistoryList;
