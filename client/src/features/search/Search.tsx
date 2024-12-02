import SearchTabs from './SearchTabs.tsx';
import Heading2 from '../../ui-library/Typography/Heading2.tsx';

const Search = () => {
  return (
    <div className="px-4 py-5">
      <SearchTabs />
      <div className="grid grid-cols-2">
        <Heading2>Top Result</Heading2>
        <Heading2>Songs</Heading2>
      </div>
    </div>
  );
};

export default Search;
