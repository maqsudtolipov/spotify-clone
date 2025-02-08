import PlayHeader from '../../../components/PlayHeader/PlayHeader.tsx';
import PlayButton from '../../../components/PlayHeader/PlayButton.tsx';
import TransparentButton from '../../../components/PlayHeader/TransparentButton.tsx';
import HeaderActions from '../../../components/PlayHeader/HeaderActions.tsx';
import { Playlist } from '../playlistSlice.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { savePlaylist } from '../playlistThunks.ts';

const isLiked = (id: string, likedPlaylists: string[]) => {
  return likedPlaylists.includes(id);
};

const PlaylistActions = ({ data }: Playlist) => {
  const likedPlaylists = useAppSelector(
    (state) => state.user?.data?.likedPlaylists
  );

  const dispatch = useAppDispatch();

  const handleSave = (id: string) => {
    dispatch(savePlaylist({ id }));
  };
  const handleRemove = (id: string) => {
  };

  return (
    <PlayHeader>
      <PlayButton />
      <TransparentButton
        text={isLiked(data.id, likedPlaylists) ? 'Remove' : 'Save'}
        onClick={() => handleSave(data.id)}
      />
      <HeaderActions />
    </PlayHeader>
  );
};

export default PlaylistActions;
