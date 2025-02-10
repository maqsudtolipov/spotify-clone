import Tabs from '../../ui/Tabs/Tabs.tsx';
import TabsList from '../../ui/Tabs/TabsList.tsx';
import Tab from '../../ui/Tabs/Tab.tsx';

interface HistoryTabsProps {
  selectedFilter: string;
  handleChangeFilter: (filter: string) => void;
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
