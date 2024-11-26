import styles from './HistoryCard.module.scss';
import CardImage from './CardImage.tsx';
import CardInfo from './CardInfo.tsx';
import { RiPlayCircleFill } from 'react-icons/ri';

interface HistoryItem {
  img: string;
  name: string;
  type: ('artist' | 'playlist' | 'song')[];
}

interface HistoryCardProps {
  data: HistoryItem;
  handleNewColor: () => void;
}

const HistoryCard = ({ data, handleNewColor }: HistoryCardProps) => {
  return (
    <li className={styles.historyCard} onMouseEnter={handleNewColor}>
      <CardImage src={data.img} alt={data.name} />
      <CardInfo>{data.name}</CardInfo>
      <RiPlayCircleFill className={styles.cardIcon} />
    </li>
  );
};

export default HistoryCard;
