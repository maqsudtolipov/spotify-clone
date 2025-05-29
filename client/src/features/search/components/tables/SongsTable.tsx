import TableHeader from '../../../../ui/Table/TableHeader.tsx';
import TableCell from '../../../../ui/Table/TableCell.tsx';
import Table from '../../../../ui/Table/Table.tsx';
import TableBody from '../../../../ui/Table/TableBody.tsx';
import TableRow from '../../../../ui/Table/TableRow.tsx';
import IndexCell from '../../../../ui/Table/custom/SortedTable/Cells/IndexCell.tsx';
import visualizerSvg from '../../../../assets/icons/visualizer.svg';
import InfoCell from '../../../../ui/Table/custom/SortedTable/Cells/InfoCell.tsx';
import LikeCell from '../../../../ui/Table/custom/SortedTable/Cells/LikeCell.tsx';
import secondsToTimeFormat from '../../../../helpers/secondsToTimeFormat.ts';
import PlaylistActionsCell from '../../../playlist/components/actionsCell/PlaylistActionsCell.tsx';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.ts';
import { dislikeSong, likeSong } from '../../../user/userThunks.ts';
import {
  moveSongToTop,
  playerSetList,
  playerTogglePlay,
  setItems,
} from '../../../queue/queueSlice.ts';
import { useEffect } from 'react';

const AllTable = ({ songs, query }) => {
  const currentListId = useAppSelector((state) => state.queue.currentListId);
  const isPlaying = useAppSelector((state) => state.queue.isPlaying);
  const currentSong = useAppSelector((state) => state.queue.items[0]);
  const playlistId = `allSongs=${query}`;

  const likedSongs = useAppSelector(
    (state) => state.user?.data?.likedSongs?.songs ?? [],
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentListId === playlistId) {
      dispatch(setItems(songs));
    }
  }, [songs.length]);

  const toggleLikeSong = (id: string, isLiked: boolean) =>
    dispatch(isLiked ? dislikeSong({ id }) : likeSong({ id }));

  const handleChangeSong = (id: string) => {
    if (currentListId === playlistId) {
      if (!isPlaying) dispatch(playerTogglePlay());
    } else {
      dispatch(playerSetList({ id: playlistId, name: 'Search Results' }));
      dispatch(setItems(songs));
    }
    dispatch(moveSongToTop(id));
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableCell>
            <span>#</span>
          </TableCell>
          <TableCell>
            <span>Title</span>
          </TableCell>
          <TableCell>
            <span>Plays</span>
          </TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell>Time</TableCell>
          <TableCell>&nbsp;</TableCell>
        </TableHeader>

        <TableBody>
          {songs.map((song, index) => {
            const isLiked = likedSongs.includes(song.id);
            const isActiveSong =
              `allSongs=${query}` === currentListId &&
              currentSong?.id === song.id;

            return (
              <TableRow key={`allSongs=${query}-${song.id}`}>
                <IndexCell onClick={() => handleChangeSong(song.id)}>
                  {isActiveSong && isPlaying ? (
                    <img src={visualizerSvg} alt="Audio visualizer" />
                  ) : (
                    index + 1
                  )}
                </IndexCell>
                <InfoCell
                  img={song.img.url}
                  name={song.name}
                  artist={song.artist.name}
                  isActive={isActiveSong}
                />
                <TableCell>{song.playCount.totalPlays}</TableCell>
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
      </Table>
    </div>
  );
};

export default AllTable;
