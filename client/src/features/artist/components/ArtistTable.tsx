import Table from '../../../ui/Table/Table.tsx';
import TableRow from '../../../ui/Table/TableRow.tsx';
import TableCell from '../../../ui/Table/TableCell.tsx';
import IndexCell from '../../../ui/Table/Cells/IndexCell.tsx';
import InfoCell from '../../../ui/Table/Cells/InfoCell.tsx';
import TableBody from '../../../ui/Table/TableBody.tsx';
import LikeCell from '../../../ui/Table/Cells/LikeCell.tsx';
import ActionsCell from '../../../ui/Table/Cells/ActionsCell.tsx';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import secondsToTimeFormat from '../../../helpers/secondsToTimeFormat.ts';
import { dislikeSong, likeSong } from '../../auth/userThunks.ts';

const ArtistTable = () => {
  const songs = useAppSelector((state) => state.artist?.data?.songs);
  const likedSongs = useAppSelector(
    (state) => state.user?.data?.likedSongs?.songs
  );
  const dispatch = useAppDispatch();

  console.log(songs);

  const isSongLiked = (id: string, likedSongs: string[]) => {
    return likedSongs.includes(id);
  };

  const handleLikeSong = (id: string) => {
    dispatch(likeSong({ id }));
  };

  const handleDislikeSong = (id: string) => {
    dispatch(dislikeSong({ id }));
  };

  return (
    <Table>
      <TableBody>
        {likedSongs &&
          songs?.map((item, index) => (
            <TableRow key={item.name}>
              <IndexCell>{index + 1}</IndexCell>
              <InfoCell img={item.img.url} name={item.name} />
              <TableCell>{item.plays}</TableCell>

              <LikeCell
                isLiked={isSongLiked(item.id, likedSongs)}
                onClick={() =>
                  isSongLiked(item.id, likedSongs)
                    ? handleDislikeSong(item.id)
                    : handleLikeSong(item.id)
                }
              />
              <TableCell minimize={true}>
                {secondsToTimeFormat(item.duration)}
              </TableCell>

              <ActionsCell id={item.id} />
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default ArtistTable;
