import styles from './Card.module.scss';
import { RiPlayLargeFill } from 'react-icons/ri';
import { playerSetList, playerTogglePlay, setItems } from '../../features/queue/queueSlice.ts';
import { useAppSelector } from '../../redux/hooks.ts';
import { useDispatch } from 'react-redux';

interface CardImageProps {
  img: string;
  alt: string;
  isRounded: boolean;
  data: any;
}

const CardImage = ({ img, alt, isRounded, data }: CardImageProps) => {
  const isPlaying = useAppSelector((state) => state.queue.isPlaying);
  const currentListId = useAppSelector((state) => state.queue.currentListId);
  const dispatch = useDispatch();

  const handlePlay = () => {
    dispatch(playerSetList(data.id));
    dispatch(setItems([data]));
    if (!isPlaying) dispatch(playerTogglePlay());
  };

  return (
    <div
      className={`${styles.cardImage} ${isRounded ? styles.cardImageRounded : ''}`}
    >
      <img src={img} alt={alt} />
      <div className={styles.gradient}></div>
      <RiPlayLargeFill className={styles.imageIcon} onClick={handlePlay} />
    </div>
  );
};

export default CardImage;
