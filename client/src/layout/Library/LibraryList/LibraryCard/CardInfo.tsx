import styles from './LibraryCard.module.scss';

interface CardInfoProps {
  name: string;
  isPinned?: boolean;
  type: string;
  length?: string;
  owner?: string;
}

const combineDescription = (arr: string[]): string => {
  return arr.join(' • ');
};

const CardInfo = ({ name, isPinned, type, length, owner }: CardInfoProps) => {
  return (
    <div className={styles.cardInfo}>
      <span className={styles.cardInfoName}>{name}</span>
      <div className={styles.cardInfoDescription}>
        <span>{combineDescription(['Playlist', 'Christina', '12 songs'])}</span>
      </div>
    </div>
  );
};

export default CardInfo;
