import ArtistTable from './ArtistTable.tsx';
import ArtistHeader from './ArtistHeader.tsx';
import PlayHeader from '../../components/PlayHeader/PlayHeader.tsx';
import GradientBackground from '../../components/GradientBackground/GradientBackground.tsx';

const Artist = () => {
  const color =
    '#' +
    ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0') +
    '4d';

  return (
    <div>
      <ArtistHeader color={color} />
      <GradientBackground color={color}>
        <PlayHeader />
        <div className="p-5 pt-0">
          <ArtistTable />
        </div>
      </GradientBackground>
    </div>
  );
};

export default Artist;
