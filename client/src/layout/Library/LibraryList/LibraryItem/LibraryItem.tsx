interface LibraryItemData {
  img: string;
  name: string;
}

interface LibraryItemProps {
  data: LibraryItemData;
}

const LibraryItem = ({ data }: LibraryItemProps) => {
  const { img, name } = data;

  return (
    <li>
      <img src={img} alt={`Cover for ${name}`} />
      <span>name</span>
    </li>
  );
};

export default LibraryItem;
