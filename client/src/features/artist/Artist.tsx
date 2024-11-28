import ArtistTable from './ArtistTable.tsx';
import ArtistHeader from './ArtistHeader.tsx';

const Artist = () => {
  return (
    <div>
      <ArtistHeader />
      <div className="p-5">
        <h2 className="text-3xl text-bold mb-4">Artist</h2>
        <ArtistTable />
      </div>
    </div>
  );
};

export default Artist;
