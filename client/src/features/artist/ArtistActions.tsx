import styles from './Artist.module.scss';
import {
  RiDeleteBin6Line,
  RiEditLine,
  RiMoreFill,
  RiPlayLargeFill,
  RiShareForwardBoxFill,
} from 'react-icons/ri';
import Dropdown from '../../ui-library/Dropdown/Dropdown.tsx';
import DropdownTrigger from '../../ui-library/Dropdown/DropdownTrigger.tsx';
import DropdownList from '../../ui-library/Dropdown/DropdownList.tsx';
import DropdownItem from '../../ui-library/Dropdown/DropdownItem.tsx';

const ArtistActions = () => {
  return (
    <div className={styles.artistActions}>
      <RiPlayLargeFill className={styles.playButton} role="button" />
      <button className={styles.followButton}>Follow</button>
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
    </div>
  );
};

export default ArtistActions;
