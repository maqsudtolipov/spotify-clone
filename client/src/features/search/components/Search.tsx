import SearchTabs from './SearchTabs.tsx';
import SearchSongs from './tabs/SearchSongs.tsx';
import SearchArtists from './tabs/SearchArtists.tsx';
import SearchPlaylists from './tabs/SearchPlaylists.tsx';
import SearchProfiles from './tabs/SearchProfiles.tsx';
import SearchAll from './tabs/SearchAll.tsx';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { changeTab } from '../searchSlice.ts';
import { useEffect, useRef } from 'react';

type Tabs = 'all' | 'artists' | 'playlists' | 'songs' | 'profiles';

const Search = () => {
  const { query, tab } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  const searchPageRef = useRef<HTMLDivElement | null>(null);

  // Scroll to top on query change
  useEffect(() => {
    if (searchPageRef.current) searchPageRef.current.scrollIntoView();
  }, [query]);

  const handleTabChange = (tab: Tabs) => {
    dispatch(changeTab(tab));
  };

  return (
    <div ref={searchPageRef} className="px-4 py-5 min-h-full">
      <SearchTabs handleTabChange={handleTabChange} />

      {tab === 'all' && <SearchAll />}
      {tab === 'songs' && <SearchSongs />}
      {tab === 'artists' && <SearchArtists />}
      {tab === 'playlists' && <SearchPlaylists />}
      {tab === 'profiles' && <SearchProfiles />}
    </div>
  );
};

export default Search;
