import React, { useContext } from 'react';
import { useAppDispatch } from '../../../../redux/hooks.ts';
import { DropdownContext } from '../../../../ui/Dropdown/Dropdown.tsx';
import useOutsideClick from '../../../../hooks/useOutsideClick.tsx';
import DropdownTrigger from '../../../../ui/Dropdown/DropdownTrigger.tsx';
import { RiDeleteBin6Line, RiHeartFill, RiMoreFill, RiShareForwardBoxFill, RiUserHeartLine } from 'react-icons/ri';
import DropdownList from '../../../../ui/Dropdown/DropdownList.tsx';
import DropdownItem from '../../../../ui/Dropdown/DropdownItem.tsx';
import AddToPlaylistItem from '../../../../ui/Dropdown/custom/AddToPlaylistItem.tsx';

interface PlaylistSongActionsProps {
  id: string;
}

const PlaylistSongActions = ({ id }: PlaylistSongActionsProps) => {
  const context = useContext(DropdownContext);
  if (!context) return null;

  const dispatch = useAppDispatch();

  const { closeDropdown } = context;
  const { ref, exceptionRef } = useOutsideClick(closeDropdown);

  return (
    <>
      <DropdownTrigger>
        <RiMoreFill />
      </DropdownTrigger>
      <DropdownList ref={ref} removeOutsideClick={true}>
        <DropdownItem PreIcon={RiDeleteBin6Line} underline={true}>
          Remove
        </DropdownItem>
        <AddToPlaylistItem id={id} />
        <DropdownItem PreIcon={RiHeartFill}>Save to Liked Songs</DropdownItem>
        <DropdownItem PreIcon={RiShareForwardBoxFill}>Share</DropdownItem>
        <DropdownItem PreIcon={RiUserHeartLine}>Go to Artist</DropdownItem>
      </DropdownList>
    </>
  );
};

export default PlaylistSongActions;
