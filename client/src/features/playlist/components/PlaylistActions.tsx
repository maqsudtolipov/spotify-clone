import PlayHeader from '../../../components/PlayHeader/PlayHeader.tsx';
import PlayButton from '../../../components/PlayHeader/PlayButton.tsx';
import TransparentButton from '../../../components/PlayHeader/TransparentButton.tsx';
import HeaderActions from '../../../components/PlayHeader/HeaderActions.tsx';
import { Playlist } from '../playlistSlice.ts';
import { useAppSelector } from '../../../app/hooks.ts';

const isLiked = (id: string, likedPlaylists: string[]) => {
  return likedPlaylists.includes(id);
};

const PlaylistActions = ({ data }: Playlist) => {
  const likedPlaylists = useAppSelector(
    (state) => state.user?.data?.likedPlaylists
  );

  return (
    <PlayHeader>
      <PlayButton />
      <TransparentButton
        text={isLiked(data.id, likedPlaylists) ? 'Remove' : 'Save'}
        onClick={() => {
        }}
      />
      <HeaderActions />
    </PlayHeader>
  );
};

export default PlaylistActions;
