import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import Table from '../../ui-library/Table/Table.tsx';
import TableHeader from '../../ui-library/Table/TableHeader.tsx';
import TableCell from '../../ui-library/Table/TableCell.tsx';
import TableBody from '../../ui-library/Table/TableBody.tsx';
import TableRow from '../../ui-library/Table/TableRow.tsx';
import IndexCell from '../../ui-library/Table/Cells/IndexCell.tsx';
import InfoCell from '../../ui-library/Table/Cells/InfoCell.tsx';
import LikeCell from '../../ui-library/Table/Cells/LikeCell.tsx';
import ActionsCell from '../../ui-library/Table/Cells/ActionsCell.tsx';
import SortedTable from '../../ui-library/Table/SortedTable.tsx';

interface Item {
  img: string;
  name: string;
  artist: string;
  plays: number;
  isLiked: boolean;
}

const PlaylistTable = () => {
  const [items, setItems] = useState<Item[]>();

  useEffect(() => {
    const fetchedItems = Array.from({ length: 18 }, () => ({
      img: faker.image.url({ height: 160, width: 160 }),
      name: `${faker.word.adjective()} ${faker.word.noun()}`,
      artist: faker.person.fullName(),
      plays: faker.number.int(999),
      isLiked: faker.datatype.boolean(),
    }));

    setItems(fetchedItems);
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold p-2">Sorted</h2>
      {items && <SortedTable items={items} />}
      <h2 className="text-2xl font-bold p-2">Regular</h2>
      <Table>
        <TableHeader>
          <TableCell>#</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Plays</TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell>Time</TableCell>
          <TableCell>&nbsp;</TableCell>
        </TableHeader>
        <TableBody>
          {items?.map((item, index) => (
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
    </>
  );
};

export default PlaylistTable;
