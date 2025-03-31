import TableCell from '../../../../ui/Table/TableCell.tsx';
import styles from '../../../../ui/Table/custom/SortedTable/Cells/ActionCell.module.scss';
import Dropdown from '../../../../ui/Dropdown/Dropdown.tsx';
import PlaylistSongActions from './PlaylistSongActions.tsx';

interface PlaylistActionsCellProps {
  id: string;
  duration: number;
}

const PlaylistActionsCell = ({ id, duration }: PlaylistActionsCellProps) => {
  return (
    <TableCell className={styles.actionsCell} minimize={true}>
      <Dropdown>
        <PlaylistSongActions id={id} duration={duration} />
      </Dropdown>
    </TableCell>
  );
};

export default PlaylistActionsCell;
