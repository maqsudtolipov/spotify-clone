import styles from '../../../../ui/Table/custom/SortedTable/Cells/ActionCell.module.scss';
import ArtistSongActions from '../ArtistSongActions.tsx';
import TableCell from '../../../../ui/Table/TableCell.tsx';
import Dropdown from '../../../../ui/Dropdown/Dropdown.tsx';

interface ArtistSongActionsCellProps {
  id: string;
  artistId: string;
}

const ArtistSongActionsCell = ({
  id,
  artistId,
}: ArtistSongActionsCellProps) => {
  return (
    <TableCell className={styles.actionsCell} minimize={true}>
      <Dropdown>
        <ArtistSongActions id={id} artistId={artistId} />
      </Dropdown>
    </TableCell>
  );
};

export default ArtistSongActionsCell;
