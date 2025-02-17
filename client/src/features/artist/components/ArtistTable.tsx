import Table from '../../../ui/Table/Table.tsx';
import TableRow from '../../../ui/Table/TableRow.tsx';
import TableCell from '../../../ui/Table/TableCell.tsx';
import IndexCell from '../../../ui/Table/custom/SortedTable/Cells/IndexCell.tsx';
import InfoCell from '../../../ui/Table/custom/SortedTable/Cells/InfoCell.tsx';
import TableBody from '../../../ui/Table/TableBody.tsx';
import LikeCell from '../../../ui/Table/custom/SortedTable/Cells/LikeCell.tsx';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import secondsToTimeFormat from '../../../helpers/secondsToTimeFormat.ts';
import { dislikeSong, likeSong } from '../../user/userThunks.ts';
import { selectArtist } from '../artistSlice.ts';
import ArtistSongActionsCell from './actionsCell/ArtistSongActionsCell.tsx';

const isSongLiked = (id: string, likedSongs: string[]) => {
  return likedSongs.includes(id);
};

const ArtistTable = () => {
  const artist = useAppSelector(selectArtist);
  const likedSongs = useAppSelector(
    (state) => state.user?.data?.likedSongs?.songs,
  );
  const dispatch = useAppDispatch();

  if (!likedSongs || !artist) return null;

  const handleLikeSong = (id: string) => {
    dispatch(likeSong({ id }));
  };

  const handleDislikeSong = (id: string) => {
    dispatch(dislikeSong({ id }));
  };

  if (artist.songs.length < 1)
    return (
      <p className="py-16 text-neutral-400 text-center">
        Artist does not have songs
      </p>
    );

  return (
    <div className="p-5 pt-0">
      <Table>
        <TableBody>
          {artist.songs.map((item, index) => (
            <TableRow key={item.id}>
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
              <ArtistSongActionsCell id={item.id} artistId={artist.id} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ArtistTable;
