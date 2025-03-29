import TableHeader from '../../../../ui/Table/TableHeader.tsx';
import TableCell from '../../../../ui/Table/TableCell.tsx';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';

interface PlaylistTableHeaderProps {
  sortBy: 'alphabetically' | 'plays' | 'default';
  isAscending: boolean;
  sortByDefault: () => void;
  sortByAlphabetically: () => void;
  sortByPlays: () => void;
}

const PlaylistTableHeader = ({
  sortBy,
  isAscending,
  sortByDefault,
  sortByAlphabetically,
  sortByPlays,
}: PlaylistTableHeaderProps) => {
  return (
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
  );
};

export default PlaylistTableHeader;
