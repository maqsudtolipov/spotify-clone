import styles from './LibraryCard.module.scss';
import CardImage from './CardImage.tsx';
import CardInfo from './CardInfo.tsx';
import { RiVolumeDownFill } from 'react-icons/ri';

interface LibraryCardData {
  img: string;
  name: string;
  type: string;
}

interface LibraryCardProps {
  data: LibraryCardData;
}

const LibraryCard = ({ data }: LibraryCardProps) => {
  const isPlaying = false;

  const { img, name, type } = data;

  return (
    <li className={styles.libraryCard}>
      <CardImage
        src={img}
        name={`Cover for ${name}`}
        isArtist={type === 'artist'}
      />
      <CardInfo name={name} type={type} />
      {isPlaying && <RiVolumeDownFill className={styles.cardIcon} />}
    </li>
  );
};

export default LibraryCard;
