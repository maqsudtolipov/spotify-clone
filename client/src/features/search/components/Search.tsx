import SearchTabs from './SearchTabs.tsx';
import SearchSongs from './tabs/SearchSongs.tsx';
import SearchArtists from './tabs/SearchArtists.tsx';
import SearchPlaylists from './tabs/SearchPlaylists.tsx';
import SearchProfiles from './tabs/SearchProfiles.tsx';
import SearchAll from './tabs/SearchAll.tsx';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { changeTab } from '../searchSlice.ts';

type Tabs = 'all' | 'artists' | 'playlists' | 'songs' | 'profiles';

const Search = () => {
  const tab = useAppSelector((state) => state.search.tab);
  const dispatch = useAppDispatch();

  const handleTabChange = (tab: Tabs) => {
    dispatch(changeTab(tab));
  };

  return (
    <div className="px-4 py-5">
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
