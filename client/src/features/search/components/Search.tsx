import SearchTabs from './SearchTabs.tsx';
import { useState } from 'react';
import SearchSongs from './tabs/SearchSongs.tsx';
import SearchArtists from './tabs/SearchArtists.tsx';
import SearchPlaylists from './tabs/SearchPlaylists.tsx';
import SearchProfiles from './tabs/SearchProfiles.tsx';
import SearchAll from './tabs/SearchAll.tsx';

type Tabs = 'all' | 'artists' | 'playlists' | 'songs' | 'profiles';

const Search = () => {
  const [tab, setTab] = useState<Tabs>('all');

  const handleTabChange = (tab: Tabs) => {
    setTab(tab);
  };

  return (
    <div className="px-4 py-5">
      <SearchTabs handleTabChange={handleTabChange} />

      {tab === 'all' && <SearchAll />}
      {tab === 'artists' && <SearchArtists />}
      {tab === 'playlists' && <SearchPlaylists />}
      {tab === 'songs' && <SearchSongs />}
      {tab === 'profiles' && <SearchProfiles />}
    </div>
  );
};

export default Search;
