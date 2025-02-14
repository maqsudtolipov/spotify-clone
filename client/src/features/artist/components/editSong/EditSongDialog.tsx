import Dialog from '../../../../ui/Dialog/Dialog.tsx';
import DialogTrigger from '../../../../ui/Dialog/DialogTrigger.tsx';
import DialogContent from '../../../../ui/Dialog/DialogContent.tsx';
import { RiEditLine } from 'react-icons/ri';
import DropdownItem from '../../../../ui/Dropdown/DropdownItem.tsx';
import EditSongForm from './EditSongForm.tsx';

interface EditSongDialogProps {
  id: string;
}

const EditSongDialog = ({ id }: EditSongDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <DropdownItem PreIcon={RiEditLine} closeOnClick={false}>
          Edit
        </DropdownItem>
      </DialogTrigger>
      <DialogContent>
        <EditSongForm id={id} />
      </DialogContent>
    </Dialog>
  );
};

export default EditSongDialog;
