import ArtistTable from './ArtistTable.tsx';
import ArtistHeader from './ArtistHeader.tsx';
import ArtistActions from './ArtistActions.tsx';

const Artist = () => {
  const color =
    '#' +
    ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0') +
    '4d';

  return (
    <div>
      <ArtistHeader color={color} />
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(23, 23, 23, 0.5), rgb(23, 23, 23) 40vh),
        linear-gradient(
        ${color},
        ${color} 40vh,
        transparent 40vh,
        transparent 100%
    )`,
        }}
      >
        <ArtistActions />
        <div className="p-5">
          <ArtistTable />
        </div>
      </div>
    </div>
  );
};

export default Artist;
