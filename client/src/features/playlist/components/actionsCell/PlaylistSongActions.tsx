import { useContext } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.ts';
import { DropdownContext } from '../../../../ui/Dropdown/Dropdown.tsx';
import useOutsideClick from '../../../../hooks/useOutsideClick.tsx';
import DropdownTrigger from '../../../../ui/Dropdown/DropdownTrigger.tsx';
import { RiDeleteBin6Line, RiMoreFill } from 'react-icons/ri';
import DropdownList from '../../../../ui/Dropdown/DropdownList.tsx';
import DropdownItem from '../../../../ui/Dropdown/DropdownItem.tsx';
import AddToPlaylistItem from '../../../../ui/Dropdown/custom/AddToPlaylistItem.tsx';
import { removeSongFromPlaylistThunk } from '../../playlistThunks.ts';

interface PlaylistSongActionsProps {
  id: string;
  duration: number;
}

const PlaylistSongActions = ({ id, duration }: PlaylistSongActionsProps) => {
  const dispatch = useAppDispatch();
  const context = useContext(DropdownContext);

  if (!context) return null;

  const { closeDropdown } = context;
  const { ref } = useOutsideClick(closeDropdown);

  const userId = useAppSelector((state) => state.user?.data?.id);
  const playlistUserId = useAppSelector(
    (state) => state.playlist?.data?.user?.id,
  );
  const playlistId = useAppSelector((state) => state.playlist?.data?.id);
  const likedSongsPlaylistId = useAppSelector(
    (state) => state.user?.data?.likedSongs._id,
  );

  if (!userId || !playlistUserId || !playlistId || !likedSongsPlaylistId)
    return null;

  const handleRemoveSong = () => {
    dispatch(
      removeSongFromPlaylistThunk({ song: { id, duration }, playlistId }),
    );
  };

  const canRemoveSong =
    userId === playlistUserId && likedSongsPlaylistId !== playlistId;

  return (
    <>
      <DropdownTrigger>
        <RiMoreFill />
      </DropdownTrigger>
      <DropdownList ref={ref} removeOutsideClick>
        {canRemoveSong && (
          <DropdownItem
            PreIcon={RiDeleteBin6Line}
            underline
            onClick={handleRemoveSong}
          >
            Remove
          </DropdownItem>
        )}
        <AddToPlaylistItem id={id} />
      </DropdownList>
    </>
  );
};

export default PlaylistSongActions;
