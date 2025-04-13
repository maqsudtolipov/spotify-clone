import styles from './Card.module.scss';
import CardImage from './CardImage.tsx';
import CardDescription from './CardDescription.tsx';
import { useNavigate } from 'react-router-dom';

interface CardData {
  img: string;
  name: string;
  description: string;
  type: 'artist' | 'playlist' | 'user' | 'song';
}

interface CardProps {
  data: CardData;
}

const Card = ({ data, type }: CardProps) => {
  const navigate = useNavigate();

  const { id, img, name, description } = data;

  const handleNavigate = () => {
    if (type === 'artist') navigate(`/artist/${id}`, { replace: true });
    else if (type === 'playlist')
      navigate(`/playlist/${id}`, { replace: true });
    else if (type === 'user') navigate(`/user/${id}`, { replace: true });
  };

  return (
    <li
      className={`${styles.card} ${type === 'song' ? styles.playCard : ''}`}
      onClick={handleNavigate}
    >
      <CardImage
        data={type === 'song' ? data : null}
        img={img.url}
        alt={name}
        isRounded={type === 'artist'}
      />
      <CardDescription name={name} description={description} />
    </li>
  );
};

export default Card;
