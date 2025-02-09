import Dropdown from '../../ui/Dropdown/Dropdown.tsx';
import DropdownTrigger from '../../ui/Dropdown/DropdownTrigger.tsx';
import {
  RiDeleteBin6Line,
  RiEditLine,
  RiMoreFill,
  RiShareForwardBoxFill,
} from 'react-icons/ri';
import styles from './PlayHeader.module.scss';
import DropdownList from '../../ui/Dropdown/DropdownList.tsx';
import DropdownItem from '../../ui/Dropdown/DropdownItem.tsx';

const HeaderActions = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <RiMoreFill className={styles.actionsButton} role="button" />
      </DropdownTrigger>

      <DropdownList position="bottom-right">
        <DropdownItem PreIcon={RiEditLine}>Edit Details</DropdownItem>
        <DropdownItem PreIcon={RiDeleteBin6Line} underline={true}>
          Delete
        </DropdownItem>
        <DropdownItem PreIcon={RiShareForwardBoxFill}>Share</DropdownItem>
      </DropdownList>
    </Dropdown>
  );
};

export default HeaderActions;
