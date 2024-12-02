import SearchTabs from './SearchTabs.tsx';
import Heading2 from '../../ui-library/Typography/Heading2.tsx';
import { useState } from 'react';
import SearchSongs from './sub/SearchSongs.tsx';
import SearchArtists from './sub/SearchArtists.tsx';
import SearchPlaylists from './sub/SearchPlaylists.tsx';
import SearchProfiles from './sub/SearchProfiles.tsx';

type Tabs = 'all' | 'artists' | 'playlists' | 'songs' | 'profiles';

const Search = () => {
  const [tab, setTab] = useState<Tabs>('all');

  const handleTabChange = (tab: Tabs) => {
    setTab(tab);
  };

  return (
    <div className="px-4 py-5">
      <SearchTabs handleTabChange={handleTabChange} />

      {tab === 'all' && (
        <div className="grid grid-cols-[2fr_3fr]">
          <Heading2>Top Result</Heading2>
          <Heading2>Songs</Heading2>
        </div>
      )}
      {tab === 'artists' && <SearchArtists />}
      {tab === 'playlists' && <SearchPlaylists />}
      {tab === 'songs' && <SearchSongs />}
      {tab === 'profiles' && <SearchProfiles />}
    </div>
  );
};

export default Search;
