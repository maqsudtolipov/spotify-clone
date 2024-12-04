import styles from './LibraryCard.module.scss';
import { RiPushpinFill } from 'react-icons/ri';

interface CardInfoProps {
  name: string;
  isPinned?: boolean;
  type?: string;
  owner?: string;
  length?: string;
}

const combineDescription = (arr: string[]): string => {
  return arr.filter((el) => el.length).join(' • ');
};

// Add artist type

const CardInfo = ({
  name,
  isPinned,
  type,
  owner = '',
  length = '',
}: CardInfoProps) => {
  const description = combineDescription(
    type ? [type, owner, length] : [owner, length],
  );

  return (
    <div className={styles.cardInfo}>
      <span className={styles.cardInfoName}>{name}</span>
      <div className={styles.cardInfoDescription}>
        {isPinned && <RiPushpinFill className="text-green-500" />}
        <span>{description}</span>
      </div>
    </div>
  );
};

export default CardInfo;
