import DropdownItem from '../DropdownItem.tsx';
import { RiAddFill, RiArrowRightSLine } from 'react-icons/ri';
import SubMenu from '../SubMenu/SubMenu.tsx';
import { useContext } from 'react';
import { DropdownContext } from '../Dropdown.tsx';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { saveSongToPlaylist } from '../../../features/playlist/playlistThunks.ts';

interface AddToPlaylistItemProps {
  id: string;
}

const AddToPlaylistItem = ({ id }: AddToPlaylistItemProps) => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('AddToPlaylistItem should be used within the Dropdown');
  }
  const { openSubMenu } = context;

  const playlists = useAppSelector((state) => state.user?.data?.playlists);
  const dispatch = useAppDispatch();

  if (!playlists.length || !id) return null;

  const handleSaveToPlaylist = (
    songId: string,
    playlistId: string,
    playlistName: string,
  ) => {
    dispatch(saveSongToPlaylist({ songId, playlistId, playlistName }));
  };

  return (
    <DropdownItem
      PreIcon={RiAddFill}
      PostIcon={RiArrowRightSLine}
      closeOnClick={false}
      onClick={() => openSubMenu('addToPlaylist')}
    >
      Add to playlist
      <SubMenu name="addToPlaylist">
        {playlists.map((playlist) => (
          <DropdownItem
            onClick={() =>
              handleSaveToPlaylist(id, playlist._id, playlist.name)
            }
          >
            {playlist.name}
          </DropdownItem>
        ))}
      </SubMenu>
    </DropdownItem>
  );
};

export default AddToPlaylistItem;
