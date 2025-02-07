import DropdownItem from '../DropdownItem.tsx';
import { RiAddFill, RiArrowRightSLine } from 'react-icons/ri';
import DropdownSubMenu from '../SubMenu/DropdownSubMenu.tsx';
import { useContext } from 'react';
import { DropdownContext } from '../Dropdown.tsx';
import { useAppSelector } from '../../../app/hooks.ts';

const AddToPlaylistItem = () => {
  const { openSubMenu } = useContext(DropdownContext);
  const playlists = useAppSelector((state) => state.user.data.playlists);

  if (!playlists.length) return null;

  return (
    <DropdownItem
      PreIcon={RiAddFill}
      PostIcon={RiArrowRightSLine}
      closeOnClick={false}
      onClick={() => openSubMenu('addToPlaylist')}
    >
      Add to playlist
      <DropdownSubMenu name="addToPlaylist">
        {playlists.map((playlist) => (
          <DropdownItem>{playlist.name}</DropdownItem>
        ))}
      </DropdownSubMenu>
    </DropdownItem>
  );
};

export default AddToPlaylistItem;
