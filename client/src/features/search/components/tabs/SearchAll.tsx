import Heading2 from '../../../../ui/Typography/Heading2.tsx';
import CardsList from '../../../../ui/CardsList/CardsList.tsx';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.ts';
import SortedTable from '../../../../ui/Table/custom/SortedTable/SortedTable.tsx';
import { useEffect } from 'react';
import { searchMain } from '../../searchThunks.ts';

const SearchAll = () => {
  const tab = useAppSelector((state) => state.search.tab);
  const query = useAppSelector((state) => state.search.query);
  const mainLastQuery = useAppSelector(
    (state) => state.search.mainSearch.lastQuery,
  );

  const songs = useAppSelector((state) => state.search.mainSearch.songs);
  const artists = useAppSelector((state) => state.search.mainSearch.artists);
  const playlists = useAppSelector(
    (state) => state.search.mainSearch.playlists,
  );
  const users = useAppSelector((state) => state.search.mainSearch.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (query === mainLastQuery) return; // If query not changed, don't fetching again
    dispatch(searchMain(query));
  }, [tab, query]);

  if (
    !songs?.length &&
    !artists?.length &&
    !playlists?.length &&
    !users?.length
  ) {
    return (
      <p className="py-16 text-center text-neutral-400">
        No matches found, try searching a different title.
      </p>
    );
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
          <CardsList
            title="Artists"
            shrink={true}
            items={artists}
            type={'artist'}
          />
        </div>
      )}

      {artists.length && (
        <div className="mb-10">
          <CardsList
            title="Playlists"
            shrink={true}
            items={playlists}
            type={'playlist'}
          />
        </div>
      )}

      {artists.length && (
        <div className="mb-10">
          <CardsList
            title="Profiles"
            shrink={true}
            items={users}
            type={'user'}
          />
        </div>
      )}
    </div>
  );
};

export default SearchAll;
