import TableBody from '../../../../ui/Table/TableBody.tsx';
import TableRow from '../../../../ui/Table/TableRow.tsx';
import IndexCell from '../../../../ui/Table/custom/SortedTable/Cells/IndexCell.tsx';
import InfoCell from '../../../../ui/Table/custom/SortedTable/Cells/InfoCell.tsx';
import TableCell from '../../../../ui/Table/TableCell.tsx';
import LikeCell from '../../../../ui/Table/custom/SortedTable/Cells/LikeCell.tsx';
import secondsToTimeFormat from '../../../../helpers/secondsToTimeFormat.ts';
import PlaylistActionsCell from '../actionsCell/PlaylistActionsCell.tsx';
import { dislikeSong, likeSong } from '../../../user/userThunks.ts';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.ts';
import { Song } from '../../playlistTypes.ts';

interface PlaylistTableBodyProps {
  sortedItems: Song[];
}

const PlaylistTableBody = ({ sortedItems }: PlaylistTableBodyProps) => {
  const likedSongs = useAppSelector(
    (state) => state.user?.data?.likedSongs?.songs ?? [],
  );
  const dispatch = useAppDispatch();

  const toggleLikeSong = (id: string, isLiked: boolean) =>
    dispatch(isLiked ? dislikeSong({ id }) : likeSong({ id }));

  return (
    <TableBody>
      {sortedItems.map((song, index) => {
        const isLiked = likedSongs.includes(song.id);

        return (
          <TableRow key={song.name}>
            <IndexCell>{index + 1}</IndexCell>
            <InfoCell
              img={song.img.url}
              name={song.name}
              artist={song.artist.name}
            />
            <TableCell>{song.plays}</TableCell>
            <LikeCell
              isLiked={isLiked}
              onClick={() => toggleLikeSong(song.id, isLiked)}
            />
            <TableCell minimize={true}>
              {secondsToTimeFormat(song.duration)}
            </TableCell>
            <PlaylistActionsCell id={song.id} duration={song.duration} />
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default PlaylistTableBody;
