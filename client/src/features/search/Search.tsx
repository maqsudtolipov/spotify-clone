import SearchTabs from './SearchTabs.tsx';

const Search = () => {
  return (
    <div className="px-4 py-5">
      <SearchTabs />
      <div className="grid grid-cols-2">
        <h2>Top Result</h2>
        <h2>Songs</h2>
      </div>
    </div>
  );
};

export default Search;
