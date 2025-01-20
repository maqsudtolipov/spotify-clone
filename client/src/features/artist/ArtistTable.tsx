import Table from '../../ui-library/Table/Table.tsx';
import TableRow from '../../ui-library/Table/TableRow.tsx';
import TableCell from '../../ui-library/Table/TableCell.tsx';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import IndexCell from '../../ui-library/Table/Cells/IndexCell.tsx';
import InfoCell from '../../ui-library/Table/Cells/InfoCell.tsx';
import TableBody from '../../ui-library/Table/TableBody.tsx';
import LikeCell from '../../ui-library/Table/Cells/LikeCell.tsx';
import ActionsCell from '../../ui-library/Table/Cells/ActionsCell.tsx';
import { useAppSelector } from '../../app/hooks.ts';

interface Item {
  img: string;
  name: string;
  artist: string;
  plays: number;
  isLiked: boolean;
}

const ArtistTable = () => {
  // const [items, setItems] = useState<Item[]>();
  const songs = useAppSelector((state) => state.artist?.data?.songs);

  // useEffect(() => {
  //   const fetchedItems = Array.from({ length: 18 }, () => ({
  //     img: faker.image.url({ height: 160, width: 160 }),
  //     name: `${faker.word.adjective()} ${faker.word.noun()}`,
  //     artist: faker.person.fullName(),
  //     plays: faker.number.int(999),
  //     isLiked: faker.datatype.boolean(),
  //   }));
  //
  //   setItems(fetchedItems);
  // }, []);

  return (
    <Table>
      <TableBody>
        {songs?.map((item, index) => (
          <TableRow key={item.name}>
            <IndexCell>{index + 1}</IndexCell>
            <InfoCell img={item.img} name={item.name} artist={item.artist} />
            <TableCell>{item.plays}</TableCell>

            {/* TODO: add isliked and duratioin */}
            {/*<LikeCell isLiked={item.isLiked} />*/}
            {/*<TableCell minimize={true}>2:18</TableCell>*/}
            <ActionsCell />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ArtistTable;
