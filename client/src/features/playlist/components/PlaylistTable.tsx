import useSortBy from '../../../ui/Table/custom/SortedTable/hooks/useSortBy.ts';
import Table from '../../../ui/Table/Table.tsx';
import TableHeader from '../../../ui/Table/TableHeader.tsx';
import TableCell from '../../../ui/Table/TableCell.tsx';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import TableBody from '../../../ui/Table/TableBody.tsx';
import TableRow from '../../../ui/Table/TableRow.tsx';
import IndexCell from '../../../ui/Table/custom/SortedTable/Cells/IndexCell.tsx';
import InfoCell from '../../../ui/Table/custom/SortedTable/Cells/InfoCell.tsx';
import LikeCell from '../../../ui/Table/custom/SortedTable/Cells/LikeCell.tsx';
import PlaylistActionsCell from './actionsCell/PlaylistActionsCell.tsx';

interface Item {
  id: string;
  img: string;
  name: string;
  artist: string;
  plays: number;
  isLiked: boolean;
}

interface SortedTableProps {
  songs: Item[];
}

const PlaylistTable = ({ songs }) => {
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
      <p className="py-16 text-neutral-400 text-center">
        Playlist does not have songs yet
      </p>
    );

  return (
    <div className="p-5 pt-0">
      <Table>
        <TableHeader>
          <TableCell>
            <span onClick={sortByDefault}>#</span>
          </TableCell>
          <TableCell>
            <span onClick={sortByAlphabetically}>
              Title
              {sortBy === 'alphabetically' &&
                (isAscending ? <RiArrowUpSFill /> : <RiArrowDownSFill />)}
            </span>
          </TableCell>
          <TableCell>
            <span onClick={sortByPlays}>
              Plays
              {sortBy === 'plays' &&
                (isAscending ? <RiArrowUpSFill /> : <RiArrowDownSFill />)}
            </span>
          </TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell>Time</TableCell>
          <TableCell>&nbsp;</TableCell>
        </TableHeader>

        <TableBody>
          {sortedItems.map((item, index) => (
            <TableRow key={item.name}>
              <IndexCell>{index + 1}</IndexCell>
              <InfoCell
                img={item.img.url}
                name={item.name}
                artist={item.artist.name}
              />
              <TableCell>{item.plays}</TableCell>
              <LikeCell isLiked={item.isLiked} />
              <TableCell minimize={true}>2:18</TableCell>
              <PlaylistActionsCell id={item.id} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PlaylistTable;
