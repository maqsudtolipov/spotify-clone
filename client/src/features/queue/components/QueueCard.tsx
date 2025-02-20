import styles from './Queue.module.scss';
import CardImage from '../../library/components/LibraryList/LibraryCard/CardImage.tsx';
import CardInfo from '../../library/components/LibraryList/LibraryCard/CardInfo.tsx';
import React from 'react';
import { RiDraggable } from 'react-icons/ri';

interface LibraryCardData {
  img: string;
  name: string;
  artist: string;
}

interface QueueCardProps {
  data: LibraryCardData;
  isActive: boolean;
  draggable: boolean;
  onDragEnter: () => void;
  onDragOver: (e: React.DragEvent) => boolean;
  onDragEnd: () => void;
}

// TODO: This should be separated form LibraryCard component
const QueueCard = ({
                     data,
                     isActive,
                     draggable,
                     onDragEnter,
                     onDragOver,
                     onDragEnd,
                     ...rest
                   }: QueueCardProps) => {
  const { img, name, artist } = data;

  return (
    <li
      className={`${styles.libraryCard} ${isActive ? styles.libraryCardActive : ''}`}
      draggable={draggable}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      {...rest}
    >
      <CardImage src={img} name={`Cover for ${name}`} />
      <CardInfo name={name} owner={artist} />
      <RiDraggable className={styles.cardIcon} />
    </li>
  );
};

export default QueueCard;
