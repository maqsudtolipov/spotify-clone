import PlayHeader from '../../../ui/PlayHeader/PlayHeader.tsx';
import PlayButton from '../../../ui/PlayHeader/PlayButton.tsx';
import TransparentButton from '../../../ui/Button/TransparentButton.tsx';
import { Playlist } from '../playlistSlice.ts';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { removePlaylist, savePlaylist } from '../playlistThunks.ts';
import PlaylistHeaderActions from './PlaylistHeaderActions.tsx';
import { setItems } from '../../queue/queueSlice.ts';

const isLiked = (id: string, likedPlaylists: string[]) => {
  return likedPlaylists.includes(id);
};

const PlaylistActions = ({ data }: Playlist) => {
  const likedPlaylists = useAppSelector(
    (state) => state.user?.data?.likedPlaylists,
  );
  const userId = useAppSelector((state) => state.user?.data?._id);
  const likedSongsId = useAppSelector(
    (state) => state.user?.data?.likedSongs._id,
  );

  const dispatch = useAppDispatch();

  const handlePlay = () => {
    dispatch(setItems(data.songs));
  };
  const handleSave = () => {
    // For optimistic UI
    const playlist = {
      id: data.id,
      name: data.name,
      user: data.user.name,
      img: data.img.url,
      itemType: 'playlist',
      isPinned: false,
      createdAt: data.createdAt,
    };
    dispatch(savePlaylist({ playlist }));
  };

  const handleRemove = (id: string) => {
    dispatch(removePlaylist({ id }));
  };

  const isLikedSongs = data._id === likedSongsId;
  const isPersonalPlaylist = data.user._id === userId;

  return (
    <PlayHeader>
      <PlayButton onClick={handlePlay} />
      {!isPersonalPlaylist && (
        <TransparentButton
          text={isLiked(data.id, likedPlaylists) ? 'Remove' : 'Save'}
          onClick={() => {
            isLiked(data.id, likedPlaylists)
              ? handleRemove(data.id)
              : handleSave(data.id);
          }}
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
