import PlayHeader from '../../../components/PlayHeader/PlayHeader.tsx';
import PlayButton from '../../../components/PlayHeader/PlayButton.tsx';
import TransparentButton from '../../../components/PlayHeader/TransparentButton.tsx';
import HeaderActions from '../../../components/PlayHeader/HeaderActions.tsx';

const PlaylistActions = () => {
  return (
    <PlayHeader>
      <PlayButton />
      <TransparentButton text={'Save'} onClick={() => {
      }} />
      <HeaderActions />
    </PlayHeader>
  );
};

export default PlaylistActions;
