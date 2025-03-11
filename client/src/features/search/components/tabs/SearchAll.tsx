import Heading2 from '../../../../ui/Typography/Heading2.tsx';
import CardsList from '../../../../ui/CardsList/CardsList.tsx';
import { useAppSelector } from '../../../../redux/hooks.ts';
import SortedTable from '../../../../ui/Table/custom/SortedTable/SortedTable.tsx';

const SearchAll = () => {
  const songs = useAppSelector(state => state.search.mainSearch.songs)
  const artists = useAppSelector((state) => state.search.mainSearch.artists);
  const playlists = useAppSelector((state) => state.search.mainSearch.playlists);
  const users = useAppSelector((state) => state.search.mainSearch.users);

  if (!songs?.length && !artists?.length && !playlists?.length && !users?.length) {
    return <p className='py-16 text-center text-neutral-400'>No matches found, try searching a different title.</p>
  }

  return (
    <div>
      {songs.length && (
        <div className="mb-10">
          <Heading2>Songs</Heading2>
          <SortedTable items={songs} />
        </div>
      )}

      {artists.length && (
        <div className="mb-10">
          <CardsList title="Artists" shrink={true} items={artists} />
        </div>
      )}

      {artists.length && (
        <div className="mb-10">
          <CardsList title="Playlists" shrink={true} items={playlists} />
        </div>
      )}

      {artists.length && (
        <div className="mb-10">
          <CardsList title="Profiles" shrink={true} items={users} />
        </div>
      )}
    </div>
  );
};

export default SearchAll;
