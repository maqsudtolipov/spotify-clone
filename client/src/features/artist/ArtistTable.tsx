import Table from '../../ui-library/Table/Table.tsx';
import TableRow from '../../ui-library/Table/TableRow.tsx';
import TableCell from '../../ui-library/Table/TableCell.tsx';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import IndexCell from '../../ui-library/Table/Cells/IndexCell.tsx';

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
      {items?.map((item, index) => (
        <TableRow key={item.name}>
          <IndexCell>{index + 1}</IndexCell>
          <TableCell>
            <img src={item.img} alt={item.name} />
            <span>{item.name}</span>
          </TableCell>
          <TableCell>{item.plays}</TableCell>
          <TableCell>
            <span>💚</span>
            <span>00:00</span>
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
};

export default ArtistTable;
