import { useContext } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { DropdownContext } from '../../../ui/Dropdown/Dropdown.tsx';
import useOutsideClick from '../../../hooks/useOutsideClick.tsx';
import { deleteSong } from '../artistThunks.ts';
import DropdownTrigger from '../../../ui/Dropdown/DropdownTrigger.tsx';
import { RiDeleteBin6Line, RiMoreFill } from 'react-icons/ri';
import DropdownList from '../../../ui/Dropdown/DropdownList.tsx';
import EditSongDialog from './forms/editSong/EditSongDialog.tsx';
import DropdownItem from '../../../ui/Dropdown/DropdownItem.tsx';
import AddToPlaylistItem from '../../../ui/Dropdown/custom/AddToPlaylistItem.tsx';

interface ArtistSongActionsProps {
  id: string;
  artistId: string;
}

const ArtistSongActions = ({ id, artistId }: ArtistSongActionsProps) => {
  const userId = useAppSelector((state) => state.user?.data?.id);
  const dispatch = useAppDispatch();

  if (!artistId || !userId || !DropdownContext) return null;

  const context = useContext(DropdownContext);
  const { closeDropdown } = context;

  const { ref, exceptionRef } = useOutsideClick(closeDropdown);

  const handleDeleteSong = (id: string) => {
    dispatch(deleteSong(id));
  };

  return (
    <>
      <DropdownTrigger>
        <RiMoreFill />
      </DropdownTrigger>
      <DropdownList ref={ref} removeOutsideClick={true}>
        {artistId === userId && (
          <>
            <EditSongDialog ref={exceptionRef} id={id} />
            <DropdownItem
              PreIcon={RiDeleteBin6Line}
              underline={true}
              onClick={() => handleDeleteSong(id)}
            >
              Delete
            </DropdownItem>
          </>
        )}
        <AddToPlaylistItem id={id} />
        {/*<DropdownItem PreIcon={RiHeartFill}>Save to Liked Songs</DropdownItem>*/}
        {/*<DropdownItem PreIcon={RiShareForwardBoxFill}>Share</DropdownItem>*/}
        {/*<DropdownItem PreIcon={RiUserHeartLine}>Go to Artist</DropdownItem>*/}
      </DropdownList>
    </>
  );
};

export default ArtistSongActions;
