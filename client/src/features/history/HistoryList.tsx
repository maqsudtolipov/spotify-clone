import styles from './HistoryList.module.scss';
import HistoryCard from './HistoryCard/HistoryCard.tsx';
import { HistoryItem } from './History.tsx';

interface HistoryListProps {
  items?: HistoryItem[];
  handleNewColor: () => void;
}

const HistoryList = ({ items, handleNewColor }: HistoryListProps) => {
  return (
    <ul className={styles.historyList} onMouseEnter={handleNewColor}>
      {items?.length
        ? items.map((el) => (
            <HistoryCard data={el} handleNewColor={handleNewColor} />
          ))
        : 'There are no items with current filter'}
    </ul>
  );
};

export default HistoryList;
