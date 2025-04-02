import Dialog from '../../../ui/Dialog/Dialog.tsx';
import DialogTrigger from '../../../ui/Dialog/DialogTrigger.tsx';
import DropdownItem from '../../../ui/Dropdown/DropdownItem.tsx';
import { RiEditLine } from 'react-icons/ri';
import DialogContent from '../../../ui/Dialog/DialogContent.tsx';

const EditUserDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <DropdownItem PreIcon={RiEditLine} closeOnClick={false}>
          Edit Details
        </DropdownItem>
      </DialogTrigger>
      <DialogContent title="Edit playlist">edit me</DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
