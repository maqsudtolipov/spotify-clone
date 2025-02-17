import React, { useContext } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.ts';
import { DropdownContext } from '../../../../ui/Dropdown/Dropdown.tsx';
import useOutsideClick from '../../../../hooks/useOutsideClick.tsx';
import DropdownTrigger from '../../../../ui/Dropdown/DropdownTrigger.tsx';
import { RiDeleteBin6Line, RiMoreFill } from 'react-icons/ri';
import DropdownList from '../../../../ui/Dropdown/DropdownList.tsx';
import DropdownItem from '../../../../ui/Dropdown/DropdownItem.tsx';
import AddToPlaylistItem from '../../../../ui/Dropdown/custom/AddToPlaylistItem.tsx';

interface PlaylistSongActionsProps {
  id: string;
}

const PlaylistSongActions = ({ id }: PlaylistSongActionsProps) => {
  const userId = useAppSelector((state) => state.user?.data?.id);
  const playlistUserId = useAppSelector(
    (state) => state.playlist?.data?.user?.id,
  );
  const context = useContext(DropdownContext);
  if (!context || !userId || !playlistUserId) return null;

  const dispatch = useAppDispatch();

  const { closeDropdown } = context;
  const { ref } = useOutsideClick(closeDropdown);

  return (
    <>
      <DropdownTrigger>
        <RiMoreFill />
      </DropdownTrigger>
      <DropdownList ref={ref} removeOutsideClick={true}>
        {userId === playlistUserId && (
          <DropdownItem PreIcon={RiDeleteBin6Line} underline={true}>
            Remove
          </DropdownItem>
        )}
        <AddToPlaylistItem id={id} />
        {/*<DropdownItem PreIcon={RiHeartFill}>Save to Liked Songs</DropdownItem>*/}
        {/*<DropdownItem PreIcon={RiUserHeartLine}>Go to Artist</DropdownItem>*/}
      </DropdownList>
    </>
  );
};

export default PlaylistSongActions;
