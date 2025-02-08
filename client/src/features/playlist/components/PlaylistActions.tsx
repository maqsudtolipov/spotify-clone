import PlayHeader from '../../../components/PlayHeader/PlayHeader.tsx';
import PlayButton from '../../../components/PlayHeader/PlayButton.tsx';
import TransparentButton from '../../../components/PlayHeader/TransparentButton.tsx';
import { Playlist } from '../playlistSlice.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { removePlaylist, savePlaylist } from '../playlistThunks.ts';
import PlaylistHeaderActions from './PlaylistHeaderActions.tsx';

const isLiked = (id: string, likedPlaylists: string[]) => {
  return likedPlaylists.includes(id);
};

const PlaylistActions = ({ data }: Playlist) => {
  const likedPlaylists = useAppSelector(
    (state) => state.user?.data?.likedPlaylists
  );
  const userId = useAppSelector((state) => state.user?.data?._id);

  const dispatch = useAppDispatch();

  const handleSave = (id: string) => {
    dispatch(savePlaylist({ id }));
  };
  const handleRemove = (id: string) => {
    dispatch(removePlaylist({ id }));
  };

  const isPersonalPlaylist = data.user._id === userId;

  return (
    <PlayHeader>
      <PlayButton />
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
      <PlaylistHeaderActions id={data.id} />
    </PlayHeader>
  );
};

export default PlaylistActions;
