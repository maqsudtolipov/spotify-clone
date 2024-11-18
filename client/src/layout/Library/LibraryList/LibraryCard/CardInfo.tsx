import styles from './LibraryCard.module.scss';

interface CardInfoProps {
  name: string;
  isPinned?: boolean;
  type: string;
  length?: string;
  owner?: string;
}

// TODO: style Info descriptions
// TODO: add playing styles

const combineDescription = (arr: string[]): string => {
  return arr.join(' • ');
};

const CardInfo = ({ name, isPinned, type, length, owner }: CardInfoProps) => {
  return (
    <div>
      <span>{name}</span>
      <div className={styles.cardInfoDescription}>
        <span>{combineDescription(['Playlist', 'Christina', '12 songs'])}</span>
      </div>
    </div>
  );
};

export default CardInfo;
