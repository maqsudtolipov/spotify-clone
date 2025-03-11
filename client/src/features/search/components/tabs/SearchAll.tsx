import Heading2 from '../../../../ui/Typography/Heading2.tsx';
import CardsList from '../../../../ui/CardsList/CardsList.tsx';
import { useAppSelector } from '../../../../redux/hooks.ts';
import SortedTable from '../../../../ui/Table/custom/SortedTable/SortedTable.tsx';

interface CardItem {
  img: string;
  name: string;
  description: string;
  type: string;
}

interface Item {
  img: string;
  name: string;
  artist: string;
  plays: number;
  isLiked: boolean;
}

const SearchAll = () => {
  const songs = useAppSelector(state => state.search.mainSearch.songs)
  const artists = useAppSelector((state) => state.search.mainSearch.artists);
  const playlists = useAppSelector((state) => state.search.mainSearch.playlists);
  const users = useAppSelector((state) => state.search.mainSearch.users);

  return (
    <div>
      {songs && (
        <div className="mb-10">
          <Heading2>Songs</Heading2>
          <SortedTable items={songs} />
        </div>
      )}

      {artists && (
        <div className="mb-10">
          <CardsList title="Artists" shrink={true} items={artists} />
        </div>
      )}

      {playlists && (
        <div className="mb-10">
          <CardsList title="Playlists" shrink={true} items={playlists} />
        </div>
      )}

      {users && (
        <div className="mb-10">
          <CardsList title="Profiles" shrink={true} items={users} />
        </div>
      )}
    </div>
  );
};

export default SearchAll;
