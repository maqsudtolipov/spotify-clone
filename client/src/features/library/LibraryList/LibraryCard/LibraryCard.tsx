import styles from './LibraryCard.module.scss';
import CardImage from './CardImage.tsx';
import CardInfo from './CardInfo.tsx';
import { RiVolumeDownFill } from 'react-icons/ri';

interface LibraryCardData {
  img: string;
  name: string;
  isPinned: boolean;
  type: string;
}

interface LibraryCardProps {
  data: LibraryCardData;
  isCollapsed: boolean;
}

const LibraryCard = ({ data, isCollapsed }: LibraryCardProps) => {
  const isPlaying = false;

  const { img, name, isPinned, type } = data;

  return (
    <li className={styles.libraryCard}>
      <CardImage
        src={img}
        name={`Cover for ${name}`}
        isArtist={type === 'artist'}
      />
      {!isCollapsed && <CardInfo name={name} isPinned={isPinned} type={type} />}
      {isPlaying && <RiVolumeDownFill className={styles.cardIcon} />}
    </li>
  );
};

export default LibraryCard;
