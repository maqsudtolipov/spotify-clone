import styles from './HistoryCard.module.scss';
import { ReactNode } from 'react';

interface CardInfoProps {
  children: ReactNode;
}

const CardInfo = ({ children }: CardInfoProps) => {
  return <span className={styles.cardInfo}>{children}</span>;
};

export default CardInfo;
