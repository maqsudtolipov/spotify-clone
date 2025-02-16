import styles from './ActionCell.module.scss';
import TableCell from '../../../TableCell.tsx';
import SongActionsDropdown from '../../../../Dropdown/custom/SongActionsDropdown.tsx';
import Dropdown from '../../../../Dropdown/Dropdown.tsx';

interface ActionsCellProps {
  id: string;
}

const ActionsCell = ({ id }: ActionsCellProps) => {
  return (
    <TableCell className={styles.actionsCell} minimize={true}>
      <Dropdown>
        <SongActionsDropdown id={id} />
      </Dropdown>
    </TableCell>
  );
};

export default ActionsCell;
