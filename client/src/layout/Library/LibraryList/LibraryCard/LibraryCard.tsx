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
    <li>
      <img src={img} alt={`Cover for ${name}`} />
      <span>name</span>
    </li>
  );
};

export default LibraryCard;
