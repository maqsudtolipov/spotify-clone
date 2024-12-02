import SearchTabs from './SearchTabs.tsx';
import Heading2 from '../../ui-library/Typography/Heading2.tsx';
import { useState } from 'react';
import SearchSongs from './sub/SearchSongs.tsx';

const Search = () => {
  const [tab, setTab] = useState<
    'all' | 'artists' | 'playlists' | 'songs' | 'profiles'
  >('all');

  const handleTabChange = (tab): never => {
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
      {tab === 'artists' && <p>Artists</p>}
      {tab === 'playlists' && <p>Playlists</p>}
      {tab === 'songs' && <SearchSongs />}
      {tab === 'profiles' && <p>Profiles</p>}
    </div>
  );
};

export default Search;
