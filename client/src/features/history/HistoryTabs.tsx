import Tabs from '../../ui-library/Tabs/Tabs';
import TabsList from '../../ui-library/Tabs/TabsList';
import Tab from '../../ui-library/Tabs/Tab';

const HistoryTabs = () => {
  return (
    <Tabs hideUnselected={false} defaultValue="all">
      <TabsList className="mb-5">
        <Tab value="all" onClick={() => {}}>
          All
        </Tab>
        <Tab value="songs" onClick={() => {}}>
          Songs
        </Tab>
        <Tab value="artist" onClick={() => {}}>
          Artists
        </Tab>
        <Tab value="playlist" onClick={() => {}}>
          Playlists
        </Tab>
      </TabsList>
    </Tabs>
  );
};

export default HistoryTabs;
