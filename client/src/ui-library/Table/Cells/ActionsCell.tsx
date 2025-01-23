import styles from './Cells.module.scss';
import TableCell from '../TableCell.tsx';
import {
  RiAddFill,
  RiArrowRightSLine,
  RiDeleteBin6Line,
  RiHeartFill,
  RiMoreFill,
  RiShareForwardBoxFill,
  RiUserHeartLine
} from 'react-icons/ri';
import Dropdown, { DropdownContext } from '../../Dropdown/Dropdown.tsx';
import DropdownTrigger from '../../Dropdown/DropdownTrigger.tsx';
import DropdownList from '../../Dropdown/DropdownList.tsx';
import DropdownItem from '../../Dropdown/DropdownItem.tsx';
import EditSongDialog from '../../../features/artist/EditSongDialog.tsx';
import useOutsideClick from '../../../hooks/useOutsideClick.tsx';
import { forwardRef, useContext } from 'react';

const RefPasser = forwardRef(({ id }) => {
  const { closeDropdown } = useContext(DropdownContext);
  const { ref, exceptionRef } = useOutsideClick(closeDropdown);

  return (
    <DropdownList ref={ref}>
      <EditSongDialog ref={exceptionRef} id={id} />
      <DropdownItem PreIcon={RiDeleteBin6Line} underline={true}>
        Delete
      </DropdownItem>
      <DropdownItem PreIcon={RiAddFill} PostIcon={RiArrowRightSLine}>
        Add to playlist
      </DropdownItem>
      <DropdownItem PreIcon={RiHeartFill}>Save to Liked Songs</DropdownItem>
      <DropdownItem PreIcon={RiShareForwardBoxFill}>Share</DropdownItem>
      <DropdownItem PreIcon={RiUserHeartLine}>Go to Artist</DropdownItem>
    </DropdownList>
  );
});

const ActionsCell = ({ id }) => {
  return (
    <TableCell className={styles.actionsCell} minimize={true}>
      <Dropdown>
        <DropdownTrigger>
          <RiMoreFill />
        </DropdownTrigger>
        <RefPasser id={id} />
      </Dropdown>
    </TableCell>
  );
};

export default ActionsCell;
