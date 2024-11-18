import styles from './LibraryCard.module.scss';
import CardImage from './CardImage.tsx';

interface LibraryCardData {
  img: string;
  name: string;
}

interface LibraryCardProps {
  data: LibraryCardData;
}

const LibraryCard = ({ data }: LibraryCardProps) => {
  const { img, name } = data;

  return (
    <li className={styles.libraryCard}>
      <CardImage src={img} name={`Cover for ${name}`} />
      <span>name</span>
    </li>
  );
};

export default LibraryCard;
