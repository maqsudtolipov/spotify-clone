import styles from './LibraryCard.module.scss';
import CardImage from './CardImage.tsx';
import CardInfo from './CardInfo.tsx';
import { RiVolumeDownFill } from 'react-icons/ri';

interface LibraryCardData {
  img: string;
  name: string;
  isPinned: boolean;
  itemType: string;
}

interface LibraryCardProps {
  data: LibraryCardData;
  isCollapsed: boolean;
}

const LibraryCard = ({ data, isCollapsed }: LibraryCardProps) => {
  const isPlaying = false;

  return (
    <li className={styles.libraryCard}>
      <CardImage
        src={data.img}
        name={`Cover for ${data.name}`}
        isArtist={data.itemType === 'artist'}
      />
      {!isCollapsed && (
        <CardInfo
          name={data.name}
          isPinned={data.isPinned}
          type={data.itemType}
        />
      )}
      {isPlaying && <RiVolumeDownFill className={styles.cardIcon} />}
    </li>
  );
};

export default LibraryCard;
