import PlayHeader from '../../../ui/PlayHeader/PlayHeader.tsx';
import PlayButton from '../../../ui/PlayHeader/PlayButton.tsx';
import TransparentButton from '../../../ui/Button/TransparentButton.tsx';
import { Playlist } from '../playlistTypes.ts';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { removePlaylist, savePlaylist } from '../playlistThunks.ts';
import PlaylistHeaderActions from './PlaylistHeaderActions.tsx';
import {
  playerSetList,
  playerTogglePlay,
  setItems,
} from '../../queue/queueSlice.ts';

interface PlaylistActionsProps {
  data: Playlist;
}

const PlaylistActions = ({ data }: PlaylistActionsProps) => {
  const user = useAppSelector((state) => state.user.data);
  const isPlaying = useAppSelector((state) => state.queue.isPlaying);
  const currentListId = useAppSelector((state) => state.queue.currentListId);
  const dispatch = useAppDispatch();

  if (!user) throw new Error('User should not be null inside PlaylistActions');

  const { likedPlaylists, id: userId, likedSongs } = user;
  const isLikedSongs = data.id === likedSongs.id;
  const isPersonalPlaylist = data.user.id === userId;
  const isLikedPlaylist = likedPlaylists.includes(data.id);

  const handlePlay = () => {
    if (data.id === currentListId) {
      dispatch(playerTogglePlay());
    } else {
      dispatch(playerSetList({ id: data.id, name: data.name }));
      dispatch(setItems(data.songs));
      if (!isPlaying) dispatch(playerTogglePlay());
    }
  };

  const handleLikeToggle = () => {
    isLikedPlaylist
      ? dispatch(removePlaylist({ id: data.id }))
      : dispatch(
          savePlaylist({
            playlist: {
              id: data.id,
              name: data.name,
              user: data.user.name,
              img: data.img.url,
              itemType: 'playlist',
              isPinned: false,
              createdAt: data.createdAt,
            },
          }),
        );
  };

  const isListPlaying = data.id === currentListId ? !!isPlaying : false;

  return (
    <PlayHeader>
      <PlayButton onClick={handlePlay} isPlaying={isListPlaying} />
      {!isPersonalPlaylist && (
        <TransparentButton
          text={isLikedPlaylist ? 'Remove' : 'Save'}
          onClick={handleLikeToggle}
        />
      )}
      {!isLikedSongs && (
        <PlaylistHeaderActions
          id={data.id}
          isPersonalPlaylist={isPersonalPlaylist}
        />
      )}
    </PlayHeader>
  );
};

export default PlaylistActions;
