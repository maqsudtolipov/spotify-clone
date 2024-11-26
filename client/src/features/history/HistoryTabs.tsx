import Tabs from '../../ui-library/Tabs/Tabs';
import TabsList from '../../ui-library/Tabs/TabsList';
import Tab from '../../ui-library/Tabs/Tab';

interface HistoryTabsProps {
  selectedFilter: string;
  handleChangeFilter: () => {};
}

const HistoryTabs = ({
  selectedFilter,
  handleChangeFilter,
}: HistoryTabsProps) => {
  return (
    <Tabs hideUnselected={false} defaultValue={selectedFilter}>
      <TabsList className="mb-5">
        <Tab value="all" onClick={handleChangeFilter}>
          All
        </Tab>
        <Tab value="song" onClick={handleChangeFilter}>
          Songs
        </Tab>
        <Tab value="artist" onClick={handleChangeFilter}>
          Artists
        </Tab>
        <Tab value="playlist" onClick={handleChangeFilter}>
          Playlists
        </Tab>
      </TabsList>
    </Tabs>
  );
};

export default HistoryTabs;
