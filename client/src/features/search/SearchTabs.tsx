import Tabs from '../../ui-library/Tabs/Tabs';
import TabsList from '../../ui-library/Tabs/TabsList';
import Tab from '../../ui-library/Tabs/Tab';

const SearchTabs = () => {
  return (
    <Tabs hideUnselected={false} defaultValue="all">
      <TabsList className="mb-5">
        <Tab value="all">All</Tab>
        <Tab value="song">Songs</Tab>
        <Tab value="artist">Artists</Tab>
        <Tab value="playlist">Playlists</Tab>
        <Tab value="profiles">Profiles</Tab>
      </TabsList>
    </Tabs>
  );
};

export default SearchTabs;
