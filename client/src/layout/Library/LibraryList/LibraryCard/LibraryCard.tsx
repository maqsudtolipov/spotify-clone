import styles from './LibraryCard.module.scss';
import CardImage from './CardImage.tsx';
import CardInfo from './CardInfo.tsx';

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
      <CardInfo name={name} type={'playlist'} />
    </li>
  );
};

export default LibraryCard;
