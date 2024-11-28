import Table from './Table.tsx';
import TableHeader from './TableHeader.tsx';
import TableCell from './TableCell.tsx';
import TableBody from './TableBody.tsx';
import TableRow from './TableRow.tsx';
import IndexCell from './Cells/IndexCell.tsx';
import InfoCell from './Cells/InfoCell.tsx';
import LikeCell from './Cells/LikeCell.tsx';
import ActionsCell from './Cells/ActionsCell.tsx';
import { useState } from 'react';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';

interface Item {
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
  const [sortedItems, setSortedItems] = useState<Item[]>([...items]);
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<'alphabetically' | 'plays' | 'reset'>(
    'reset',
  );

  const changeSortBy = (sortOption: 'alphabetically' | 'plays' | 'reset') => {
    if (sortOption === 'plays') {
      setSortBy('plays');
      setSortedItems((prev) =>
        [...prev].sort((a, b) =>
          isAscending ? b.plays - a.plays : a.plays - b.plays,
        ),
      );
    } else if (sortOption === 'alphabetically') {
      setSortBy('alphabetically');
      setSortedItems((prev) =>
        [...prev].sort((a, b) =>
          isAscending
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name),
        ),
      );
    } else if (sortOption === 'reset') {
      setSortBy('reset');
      setSortedItems([...items]);
    }

    setIsAscending((prev) => !prev);
  };

  return (
    <Table>
      <TableHeader>
        <TableCell>
          <span onClick={() => changeSortBy('reset')}>#</span>
        </TableCell>
        <TableCell>
          <span onClick={() => changeSortBy('alphabetically')}>
            Title
            {sortBy === 'alphabetically' &&
              (isAscending ? <RiArrowUpSFill /> : <RiArrowDownSFill />)}
          </span>
        </TableCell>
        <TableCell>
          <span onClick={() => changeSortBy('plays')}>
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
            <ActionsCell />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SortedTable;
