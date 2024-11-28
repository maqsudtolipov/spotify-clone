import ArtistTable from './ArtistTable.tsx';
import ArtistHeader from './ArtistHeader.tsx';
import ArtistActions from './ArtistActions.tsx';

const Artist = () => {
  return (
    <div>
      <ArtistHeader />
      <ArtistActions />
      <div className="p-5">
        <h2 className="text-3xl text-bold mb-4">Artist</h2>
        <ArtistTable />
      </div>
    </div>
  );
};

export default Artist;
