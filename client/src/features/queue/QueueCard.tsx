import styles from '../library/LibraryList/LibraryCard/LibraryCard.module.scss';
import CardImage from '../library/LibraryList/LibraryCard/CardImage.tsx';
import CardInfo from '../library/LibraryList/LibraryCard/CardInfo.tsx';

interface LibraryCardData {
  img: string;
  name: string;
  artist: string;
}

interface QueueCardProps {
  isActive: boolean;
  draggable: boolean;
  data: LibraryCardData;
}

const QueueCard = ({ isActive, draggable, data, ...rest }: QueueCardProps) => {
  const { img, name, artist } = data;

  return (
    <li
      className={`${styles.libraryCard} ${isActive ? styles.libraryCardActive : ''}`}
      draggable={draggable}
      {...rest}
    >
      <CardImage src={img} name={`Cover for ${name}`} />
      <CardInfo name={name} owner={artist} />
    </li>
  );
};

export default QueueCard;
