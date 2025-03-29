import useSortBy from '../../../ui/Table/custom/SortedTable/hooks/useSortBy.ts';
import Table from '../../../ui/Table/Table.tsx';
import TableHeader from '../../../ui/Table/TableHeader.tsx';
import TableCell from '../../../ui/Table/TableCell.tsx';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import TableBody from '../../../ui/Table/TableBody.tsx';
import TableRow from '../../../ui/Table/TableRow.tsx';
import IndexCell from '../../../ui/Table/custom/SortedTable/Cells/IndexCell.tsx';
import InfoCell from '../../../ui/Table/custom/SortedTable/Cells/InfoCell.tsx';
import LikeCell from '../../../ui/Table/custom/SortedTable/Cells/LikeCell.tsx';
import PlaylistActionsCell from './actionsCell/PlaylistActionsCell.tsx';
import secondsToTimeFormat from '../../../helpers/secondsToTimeFormat.ts';
import { dislikeSong, likeSong } from '../../user/userThunks.ts';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';

interface Item {
  id: string;
  img: string;
  name: string;
  artist: string;
  plays: number;
  isLiked: boolean;
}

interface SortedTableProps {
  songs: Item[];
}

const isSongLiked = (id: string, likedSongs: string[]) => {
  return likedSongs.includes(id);
};

const PlaylistTable = ({ songs }) => {
  const likedSongs = useAppSelector(
    (state) => state.user?.data?.likedSongs?.songs,
  );
  const dispatch = useAppDispatch();

  const {
    sortedItems,
    sortBy,
    isAscending,
    sortByDefault,
    sortByAlphabetically,
    sortByPlays,
  } = useSortBy(songs);

  if (sortedItems.length < 1)
    return (
      <p className="py-16 text-neutral-400 text-center">
        Playlist does not have songs yet
      </p>
    );

  const handleLikeSong = (id: string) => {
    dispatch(likeSong({ id }));
  };

  const handleDislikeSong = (id: string) => {
    dispatch(dislikeSong({ id }));
  };

  return (
    <div className="p-5 pt-0">
      <Table>
        <TableHeader>
          <TableCell>
            <span onClick={sortByDefault}>#</span>
          </TableCell>
          <TableCell>
            <span onClick={sortByAlphabetically}>
              Title
              {sortBy === 'alphabetically' &&
                (isAscending ? <RiArrowUpSFill /> : <RiArrowDownSFill />)}
            </span>
          </TableCell>
          <TableCell>
            <span onClick={sortByPlays}>
              Plays
              {sortBy === 'plays' &&
                (isAscending ? <RiArrowUpSFill /> : <RiArrowDownSFill />)}
            </span>
          </TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell>Time</TableCell>
          <TableCell>&nbsp;</TableCell>
        </TableHeader>

        <TableBody>
          {sortedItems.map((item, index) => (
            <TableRow key={item.name}>
              <IndexCell>{index + 1}</IndexCell>
              <InfoCell
                img={item.img.url}
                name={item.name}
                artist={item.artist.name}
              />
              <TableCell>{item.plays}</TableCell>
              <LikeCell
                isLiked={isSongLiked(item.id, likedSongs)}
                onClick={() =>
                  isSongLiked(item.id, likedSongs)
                    ? handleDislikeSong(item.id)
                    : handleLikeSong(item.id)
                }
              />
              <TableCell minimize={true}>
                {' '}
                {secondsToTimeFormat(item.duration)}
              </TableCell>
              <PlaylistActionsCell id={item.id} duration={item.duration} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PlaylistTable;
