import Tabs from '../../../../ui/Tabs/Tabs.js';
import TabsList from '../../../../ui/Tabs/TabsList.js';
import Tab from '../../../../ui/Tabs/Tab.js';
import { useAppDispatch } from '../../../../redux/hooks.ts';
import { filterLibraryItems } from '../../librarySlice.ts';

const LibraryFilter = () => {
  const dispatch = useAppDispatch();

  const handleSwitchTab = (value: 'artist' | 'playlist' | 'none') => {
    dispatch(filterLibraryItems(value));
  };

  return (
    <Tabs hideUnselected={true} defaultValue="none">
      <TabsList>
        <Tab value="artist" onClick={handleSwitchTab}>
          Artists
        </Tab>
        <Tab value="playlist" onClick={handleSwitchTab}>
          Playlists
        </Tab>
      </TabsList>
    </Tabs>
  );
};

export default LibraryFilter;
