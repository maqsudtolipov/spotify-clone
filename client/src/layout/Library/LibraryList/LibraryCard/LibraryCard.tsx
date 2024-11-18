import styles from './LibraryCard.module.scss';
import CardImage from './CardImage.tsx';
import CardInfo from './CardInfo.tsx';
import { RiVolumeDownFill } from 'react-icons/ri';

interface LibraryCardData {
  img: string;
  name: string;
}

interface LibraryCardProps {
  data: LibraryCardData;
}

const LibraryCard = ({ data }: LibraryCardProps) => {
  const isPlaying = false;

  const { img, name } = data;

  return (
    <li
      className={`${styles.libraryCard} ${isPlaying ? styles.libraryCardPlaying : ''}`}
    >
      <CardImage src={img} name={`Cover for ${name}`} />
      <CardInfo name={name} type={'playlist'} />
      {isPlaying && <RiVolumeDownFill className={styles.cardIcon} />}
    </li>
  );
};

export default LibraryCard;
