import Tabs from '../../ui/Tabs/Tabs.tsx';
import TabsList from '../../ui/Tabs/TabsList.tsx';
import Tab from '../../ui/Tabs/Tab.tsx';

interface SearchTabsProps {
  handleTabChange: (
    tab: 'all' | 'artists' | 'playlists' | 'songs' | 'profiles',
  ) => void;
}

const SearchTabs = ({ handleTabChange }: SearchTabsProps) => {
  return (
    <Tabs hideUnselected={false} defaultValue="all">
      <TabsList className="mb-6">
        <Tab value="all" onClick={handleTabChange}>
          All
        </Tab>
        <Tab value="artists" onClick={handleTabChange}>
          Artists
        </Tab>
        <Tab value="playlists" onClick={handleTabChange}>
          Playlists
        </Tab>
        <Tab value="songs" onClick={handleTabChange}>
          Songs
        </Tab>
        <Tab value="profiles" onClick={handleTabChange}>
          Profiles
        </Tab>
      </TabsList>
    </Tabs>
  );
};

export default SearchTabs;
