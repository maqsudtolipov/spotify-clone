import Table from '../../Table.tsx';
import TableHeader from '../../TableHeader.tsx';
import TableCell from '../../TableCell.tsx';
import TableBody from '../../TableBody.tsx';
import TableRow from '../../TableRow.tsx';
import IndexCell from '../../Cells/IndexCell.tsx';
import InfoCell from '../../Cells/InfoCell.tsx';
import LikeCell from '../../Cells/LikeCell.tsx';
import ActionsCell from '../../Cells/ActionsCell.tsx';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import useSortBy from './hooks/useSortBy.ts';

interface Item {
  id: string;
  img: string;
  name: string;
  artist: string;
  plays: number;
  isLiked: boolean;
}

interface SortedTableProps {
  items: Item[];
}

const SortedTable = ({ items }: SortedTableProps) => {
  const {
    sortedItems,
    sortBy,
    isAscending,
    sortByDefault,
    sortByAlphabetically,
    sortByPlays,
  } = useSortBy(items);

  return (
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
            <InfoCell img={item.img} name={item.name} artist={item.artist} />
            <TableCell>{item.plays}</TableCell>
            <LikeCell isLiked={item.isLiked} />
            <TableCell minimize={true}>2:18</TableCell>
            <ActionsCell id={item.id} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SortedTable;
