import PlayHeader from '../../components/PlayHeader/PlayHeader.tsx';
import PlaylistTable from './PlaylistTable.tsx';
import PlaylistHeader from './PlaylistHeader.tsx';
import GradientBackground from '../../components/GradientBackground/GradientBackground.tsx';

const Playlist = () => {
  const color =
    '#' +
    ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0') +
    '4d';

  return (
    <div>
      <PlaylistHeader color={color} />
      <GradientBackground color={color}>
        <PlayHeader />
        <div className="p-5 pt-0">
          <PlaylistTable />
        </div>
      </GradientBackground>
    </div>
  );
};

export default Playlist;
