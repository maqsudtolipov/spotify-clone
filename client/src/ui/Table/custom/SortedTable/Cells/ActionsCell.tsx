import styles from './ActionCell.module.scss';
import TableCell from '../../../TableCell.tsx';
import SongActionsDropdown from '../../../../Dropdown/custom/SongActionsDropdown.tsx';

// const RefPasser = forwardRef(({ id }) => {
//   const { closeDropdown } = useContext(DropdownContext);
//   const { ref, exceptionRef } = useOutsideClick(closeDropdown);
//   const dispatch = useAppDispatch();
//
//   const handleDeleteSong = (id: string) => {
//     dispatch(deleteSong({ id }));
//   };
//
//   return (
//     <DropdownList>
//       <EditSongDialog ref={exceptionRef} id={id} />
//
//       <DropdownItem
//         PreIcon={RiDeleteBin6Line}
//         underline={true}
//         onClick={() => handleDeleteSong(id)}
//       >
//         Delete
//       </DropdownItem>
//
//       <AddToPlaylistItem id={id} />
//
//       <DropdownItem PreIcon={RiHeartFill}>Save to Liked Songs</DropdownItem>
//       <DropdownItem PreIcon={RiShareForwardBoxFill}>Share</DropdownItem>
//       <DropdownItem PreIcon={RiUserHeartLine}>Go to Artist</DropdownItem>
//     </DropdownList>
//   );
// });

interface ActionsCellProps {
  id: string;
}

// TODO: fix outside click
const ActionsCell = ({ id }: ActionsCellProps) => {
  return (
    <TableCell className={styles.actionsCell} minimize={true}>
      <SongActionsDropdown id={id} />
    </TableCell>
  );
};

export default ActionsCell;
