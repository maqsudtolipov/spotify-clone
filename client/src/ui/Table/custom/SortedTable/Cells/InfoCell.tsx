import styles from './InfoCell.module.scss';
import TableCell from '../../../TableCell.tsx';

interface InfoCellProps {
  img: string;
  name: string;
  artist?: string;
  isActive?: boolean;
}

const InfoCell = ({ img, name, artist, isActive = false }: InfoCellProps) => {
  return (
    <TableCell className={styles.infoCell}>
      <img src={img} alt={name} />
      <div className={styles.infoCellDescription}>
        <span
          className={`${styles.infoCellName} ${isActive ? styles.infoCellNameActive : ''}`}
        >
          {name}
        </span>
        {artist && <span className={styles.infoCellArtist}>{artist}</span>}
      </div>
    </TableCell>
  );
};

export default InfoCell;
