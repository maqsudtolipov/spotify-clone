import styles from './LibraryCard.module.scss';

interface CardInfoProps {
  name: string;
  isPinned?: boolean;
  type: string;
  owner?: string;
  length?: string;
}

const combineDescription = (arr: string[]): string => {
  return arr.filter((el) => el.length).join(' • ');
};

const CardInfo = ({
  name,
  isPinned,
  type,
  owner = '',
  length = '',
}: CardInfoProps) => {
  const description = combineDescription([type, owner, length]);

  return (
    <div className={styles.cardInfo}>
      <span className={styles.cardInfoName}>{name}</span>
      <div className={styles.cardInfoDescription}>
        <span>{description}</span>
      </div>
    </div>
  );
};

export default CardInfo;
