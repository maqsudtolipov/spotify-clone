import styles from './Cells.module.scss';
import TableCell from '../TableCell.tsx';
import {
  RiAddFill,
  RiArrowRightSLine,
  RiDeleteBin6Line,
  RiEditLine,
  RiHeartFill,
  RiMoreFill,
  RiShareForwardBoxFill,
  RiUserHeartLine,
} from 'react-icons/ri';
import Dropdown from '../../Dropdown/Dropdown.tsx';
import DropdownTrigger from '../../Dropdown/DropdownTrigger.tsx';
import DropdownList from '../../Dropdown/DropdownList.tsx';
import DropdownItem from '../../Dropdown/DropdownItem.tsx';

const ActionsCell = () => {
  return (
    <TableCell className={styles.actionsCell} minimize={true}>
      <Dropdown>
        <DropdownTrigger>
          <RiMoreFill />
        </DropdownTrigger>

        <DropdownList>
          <DropdownItem PreIcon={RiEditLine}>Edit</DropdownItem>
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
      </Dropdown>
    </TableCell>
  );
};

export default ActionsCell;
