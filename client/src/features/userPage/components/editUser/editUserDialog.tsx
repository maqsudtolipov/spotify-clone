import Dialog from '../../../../ui/Dialog/Dialog.tsx';
import DialogTrigger from '../../../../ui/Dialog/DialogTrigger.tsx';
import DropdownItem from '../../../../ui/Dropdown/DropdownItem.tsx';
import { RiEditLine } from 'react-icons/ri';
import DialogContent from '../../../../ui/Dialog/DialogContent.tsx';
import { forwardRef, useContext } from 'react';
import { DropdownContext } from '../../../../ui/Dropdown/Dropdown.tsx';
import EditUserForm from './editUserForm.tsx';

const EditDialogContent = forwardRef((_, ref) => {
  const contextValue = useContext(DropdownContext);
  if (!contextValue)
    throw new Error('EditUserDialog requires DropdownContext value.');

  const { closeDropdown } = contextValue;

  const handleBackgroundClick = () => closeDropdown();

  return (
    <DialogContent
      ref={ref}
      title="Edit playlist"
      onBackgroundClick={() => handleBackgroundClick()}
    >
      <EditUserForm />
    </DialogContent>
  );
});

const EditUserDialog = forwardRef((_, ref) => {
  return (
    <Dialog>
      <DialogTrigger>
        <DropdownItem PreIcon={RiEditLine} closeOnClick={false}>
          Edit Details
        </DropdownItem>
      </DialogTrigger>
      <EditDialogContent ref={ref} />
    </Dialog>
  );
});

export default EditUserDialog;
