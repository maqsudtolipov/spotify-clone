import Table from '../../ui-library/Table/Table.tsx';
import TableRow from '../../ui-library/Table/TableRow.tsx';
import TableCell from '../../ui-library/Table/TableCell.tsx';
import IndexCell from '../../ui-library/Table/Cells/IndexCell.tsx';
import InfoCell from '../../ui-library/Table/Cells/InfoCell.tsx';
import TableBody from '../../ui-library/Table/TableBody.tsx';
import LikeCell from '../../ui-library/Table/Cells/LikeCell.tsx';
import ActionsCell from '../../ui-library/Table/Cells/ActionsCell.tsx';
import { useAppSelector } from '../../app/hooks.ts';

const ArtistTable = () => {
  const songs = useAppSelector((state) => state.artist?.data?.songs);

  return (
    <Table>
      <TableBody>
        {songs?.map((item, index) => (
          <TableRow key={item.name}>
            <IndexCell>{index + 1}</IndexCell>
            <InfoCell img={item.img} name={item.name} />
            <TableCell>{item.plays}</TableCell>

            {/* TODO: add isliked and duratioin */}
            <LikeCell isLiked={true} />
            <TableCell minimize={true}>2:18</TableCell>
            <ActionsCell />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ArtistTable;
