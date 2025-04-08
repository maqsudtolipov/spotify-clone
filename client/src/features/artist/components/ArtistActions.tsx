import styles from '../../../ui/PlayHeader/PlayHeader.module.scss';
import PlayButton from '../../../ui/PlayHeader/PlayButton.tsx';
import TransparentButton from '../../../ui/Button/TransparentButton.tsx';
import UploadSongDialog from './forms/uploadSong/UploadSongDialog.tsx';
import { followUser, unfollowUser } from '../../user/userThunks.ts';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { playerSetList, playerTogglePlay, setItems } from '../../queue/queueSlice.ts';

const isFollowed = (id: string, followings: string[]) => {
  return followings.includes(id);
};

const ArtistActions = ({ data }) => {
  const userData = useAppSelector((state) => state.user.data);
  const id = data.id;
  const isPlaying = useAppSelector((state) => state.queue.isPlaying);
  const currentListId = useAppSelector((state) => state.queue.currentListId);
  const dispatch = useAppDispatch();

  const handleFollow = () => {
    if (id && data) {
      dispatch(
        followUser({
          id,
          type: 'artist',
          artistData: {
            id: data.id,
            name: data.name,
            img: data.img.url,
            createdAt: data.createdAt,
          },
        }),
      );
    }
  };

  const handleUnfollow = () => {
    if (id) {
      dispatch(unfollowUser({ id, type: 'artist' }));
    }
  };

  const handlePlay = () => {
    if (data.id === currentListId) {
      dispatch(playerTogglePlay());
    } else {
      dispatch(playerSetList(data.id));
      dispatch(setItems(data.songs));
      if (!isPlaying) dispatch(playerTogglePlay());
    }
  };

  const { followings, id: userId } = userData;
  const isListPlaying = data.id === currentListId ? !!isPlaying : false;


  return (
    <div className={styles.playerHeader}>
      <PlayButton onClick={handlePlay} isPlaying={isListPlaying} />

      {id !== userId && (
        <TransparentButton
          text={isFollowed(id, followings) ? 'Unfollow' : 'Follow'}
          onClick={() =>
            isFollowed(id, followings) ? handleUnfollow() : handleFollow()
          }
        ></TransparentButton>
      )}

      {id === userId && data.role === 'artist' && <UploadSongDialog />}
    </div>
  );
};

export default ArtistActions;
