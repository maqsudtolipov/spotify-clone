import styles from './Cells.module.scss';
import TableCell from '../TableCell.tsx';

interface InfoCellProps {
  img: string;
  name: string;
}

const InfoCell = ({ img, name }: InfoCellProps) => {
  return (
    <TableCell className={styles.infoCell}>
      <img src={img} alt={name} />
      <div className={styles.infoCellDescription}>
        <span className={styles.infoCellName}>{name}</span>
        <span className={styles.infoCellArtist}>{name.split(' ')[0]}</span>
      </div>
    </TableCell>
  );
};

export default InfoCell;