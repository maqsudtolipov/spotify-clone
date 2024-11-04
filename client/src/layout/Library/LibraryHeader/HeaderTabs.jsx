import Tabs from '../../../ui-library/Tabs/Tabs.jsx';
import TabsList from '../../../ui-library/Tabs/TabsList.jsx';
import Tab from '../../../ui-library/Tabs/Tab.jsx';

const HeaderTabs = () => {
  return (
    <Tabs hideUnselected={true}>
      <TabsList>
        <Tab value="artists">Artists</Tab>
        <Tab value="playlsits">Playlists</Tab>
        <Tab value="songs">Podcasts</Tab>
      </TabsList>
    </Tabs>
  );
};

export default HeaderTabs;
