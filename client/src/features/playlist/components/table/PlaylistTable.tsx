import useSortBy from '../../../../ui/Table/custom/SortedTable/hooks/useSortBy.ts';
import Table from '../../../../ui/Table/Table.tsx';
import { Song } from '../../playlistTypes.ts';
import PlaylistTableBody from './PlaylistTableBody.tsx';
import PlaylistTableHeader from './PlaylistTableHeader.tsx';
import styles from './PlaylistTable.module.scss';

interface PlaylistTableProps {
  songs: Song[];
}

const PlaylistTable = ({ songs }: PlaylistTableProps) => {
  const {
    sortedItems,
    sortBy,
    isAscending,
    sortByDefault,
    sortByAlphabetically,
    sortByPlays,
  } = useSortBy(songs);

  if (sortedItems.length < 1)
    return (
      <p className={styles.emptyPlaylist}>Playlist does not have songs yet</p>
    );

  return (
    <div className={styles.tableContainer}>
      <Table>
        <PlaylistTableHeader
          sortBy={sortBy}
          isAscending={isAscending}
          sortByDefault={sortByDefault}
          sortByAlphabetically={sortByAlphabetically}
          sortByPlays={sortByPlays}
        />
        <PlaylistTableBody sortedItems={sortedItems} />
      </Table>
    </div>
  );
};

export default PlaylistTable;
