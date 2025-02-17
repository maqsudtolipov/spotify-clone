import Dialog from '../../../../../ui/Dialog/Dialog.tsx';
import DialogTrigger from '../../../../../ui/Dialog/DialogTrigger.tsx';
import DialogContent from '../../../../../ui/Dialog/DialogContent.tsx';
import { RiEditLine } from 'react-icons/ri';
import DropdownItem from '../../../../../ui/Dropdown/DropdownItem.tsx';
import EditSongForm from './EditSongForm.tsx';
import { forwardRef } from 'react';

interface EditSongDialogProps {
  id: string;
}

const EditSongDialog = forwardRef(({ id }: EditSongDialogProps, ref) => {
  return (
    <Dialog>
      <DialogTrigger>
        <DropdownItem PreIcon={RiEditLine} closeOnClick={false}>
          Edit
        </DropdownItem>
      </DialogTrigger>
      <DialogContent ref={ref} title="Edit song">
        <EditSongForm id={id} />
      </DialogContent>
    </Dialog>
  );
});

export default EditSongDialog;
