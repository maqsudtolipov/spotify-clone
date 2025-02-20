import TableCell from '../../../../ui/Table/TableCell.tsx';
import styles from '../../../../ui/Table/custom/SortedTable/Cells/ActionCell.module.scss';
import Dropdown from '../../../../ui/Dropdown/Dropdown.tsx';
import PlaylistSongActions from './PlaylistSongActions.tsx';

interface PlaylistActionsCellProps {
  id: string;
}

const PlaylistActionsCell = ({ id }: PlaylistActionsCellProps) => {
  return (
    <TableCell className={styles.actionsCell} minimize={true}>
      <Dropdown>
        <PlaylistSongActions id={id} />
      </Dropdown>
    </TableCell>
  );
};

export default PlaylistActionsCell;
