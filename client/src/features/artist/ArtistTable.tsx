import Table from '../../ui-library/Table/Table.tsx';
import TableRow from '../../ui-library/Table/TableRow.tsx';
import TableCell from '../../ui-library/Table/TableCell.tsx';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import IndexCell from '../../ui-library/Table/Cells/IndexCell.tsx';
import InfoCell from '../../ui-library/Table/Cells/InfoCell.tsx';
import TableBody from '../../ui-library/Table/TableBody.tsx';
import TableHeader from '../../ui-library/Table/TableHeader.tsx';

interface Item {
  img: string;
  name: string;
  plays: number;
}

const ArtistTable = () => {
  const [items, setItems] = useState<Item[]>();

  useEffect(() => {
    const fetchedItems = Array.from({ length: 18 }, () => ({
      img: faker.image.url({ height: 160, width: 160 }),
      name: `${faker.word.adjective()} ${faker.word.noun()}`,
      plays: faker.number.int(999),
    }));

    setItems(fetchedItems);
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableCell>#</TableCell>
        <TableCell>Title</TableCell>
        <TableCell>Plays</TableCell>
        <TableCell alightRight={true}>Time</TableCell>
      </TableHeader>
      <TableBody>
        {items?.map((item, index) => (
          <TableRow key={item.name}>
            <IndexCell>{index + 1}</IndexCell>
            <InfoCell img={item.img} name={item.name} />
            <TableCell>{item.plays}</TableCell>
            <TableCell alightRight={true}>
              <span>💚</span>
              <span>00:00</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ArtistTable;
