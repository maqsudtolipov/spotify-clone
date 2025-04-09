import styles from './LibraryCard.module.scss';
import CardImage from './CardImage.tsx';
import CardInfo from './CardInfo.tsx';
import { RiVolumeDownFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

interface LibraryCardData {
  id: string;
  img: string;
  name: string;
  user: string;
  isPinned: boolean;
  itemType: string;
}

interface LibraryCardProps {
  data: LibraryCardData;
  isCollapsed: boolean;
}

const LibraryCard = ({ data, isCollapsed }: LibraryCardProps) => {
  const navigate = useNavigate();
  const isPlaying = false;

  const handleNavigateUser = (type: string, id: string) => {
    let path = `/${type === 'artist' ? 'artist' : 'playlist'}/${id}`;
    navigate(path);
  };

  return (
    <li
      className={styles.libraryCard}
      key={data.id}
      onClick={() => handleNavigateUser(data.itemType, data.id)}
    >
      <CardImage
        src={data.img}
        name={`Cover for ${data.name}`}
        isArtist={data.itemType === 'artist'}
      />
      {!isCollapsed && (
        <CardInfo
          name={data.name}
          owner={data.user}
          isPinned={data.isPinned}
          type={data.itemType}
        />
      )}
      {isPlaying && <RiVolumeDownFill className={styles.cardIcon} />}
    </li>
  );
};

export default LibraryCard;
