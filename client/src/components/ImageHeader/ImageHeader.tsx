import styles from './ImageHeader.module.scss';
import { meta } from 'eslint-plugin-react/lib/rules/jsx-props-no-spread-multi';
import description = meta.docs.description;

interface Data {
  type: 'playlist' | 'userPage';
  img: string;
  name: string;
  description?: string;
  user?: {
    img: string;
    name: string;
  };
  statistics?: { name: string; value: number }[];
}

interface ImageHeaderProps {
  data: Data;
}

// TODO: Refactor if needed
const ImageHeader = ({ data }: ImageHeaderProps) => {
  const gradient = {
    background: `linear-gradient(${data.color}, ${data.color}), linear-gradient(#171717, #171717)`,
  };

  return (
    <header className={styles.header} style={gradient}>
      <img
        className={`${styles.img} ${data.type === 'userPage' ? styles.imgRounded : ''}`}
        src={data.img}
        alt={data.name}
      />
      <div>
        <span className={styles.type}>
          {data.type === 'playlist' ? 'Playlist' : 'User'}
        </span>
        <h1 className={styles.name}>{data.name}</h1>
        {description && (
          <p className={styles.description}>{data.description}</p>
        )}
        <div className={styles.statistics}>
          {data.user && (
            <div className={styles.user}>
              <img src={data.user.img} alt={data.user.name} />
              <span>{data.user.name}</span>
            </div>
          )}
          {data.statistics && (
            <span>
              {`${data.user ? '• ' : ''}${data.statistics
                .map((data) => `${data.value} ${data.name}`)
                .join(' • ')}`}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default ImageHeader;
