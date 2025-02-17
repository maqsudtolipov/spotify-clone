import Dialog from '../../../../ui/Dialog/Dialog.tsx';
import DialogTrigger from '../../../../ui/Dialog/DialogTrigger.tsx';
import DialogContent from '../../../../ui/Dialog/DialogContent.tsx';
import DropdownItem from '../../../../ui/Dropdown/DropdownItem.tsx';
import { RiEditLine } from 'react-icons/ri';
import EditPlaylistForm from './EditPlaylistForm.tsx';

const EditPlaylistDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <DropdownItem PreIcon={RiEditLine} closeOnClick={false}>
          Edit Details
        </DropdownItem>
      </DialogTrigger>
      <DialogContent title="Edit playlist">
        <EditPlaylistForm />
      </DialogContent>
    </Dialog>
  );
};

export default EditPlaylistDialog;
