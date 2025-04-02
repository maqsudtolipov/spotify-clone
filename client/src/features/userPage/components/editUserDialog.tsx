import Dialog from '../../../ui/Dialog/Dialog.tsx';
import DialogTrigger from '../../../ui/Dialog/DialogTrigger.tsx';
import DropdownItem from '../../../ui/Dropdown/DropdownItem.tsx';
import { RiEditLine } from 'react-icons/ri';
import DialogContent from '../../../ui/Dialog/DialogContent.tsx';
import { useContext } from 'react';
import { DropdownContext } from '../../../ui/Dropdown/Dropdown.tsx';

const EditDialogContent = () => {
  const contextValue = useContext(DropdownContext);
  if (!contextValue)
    throw new Error('EditUserDialog requires DropdownContext value.');

  const { closeDropdown } = contextValue;

  const handleBackgroundClick = () => closeDropdown();

  return (
    <DialogContent
      title="Edit playlist"
      onBackgroundClick={() => handleBackgroundClick()}
    >
      edit me
    </DialogContent>
  );
};

const EditUserDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <DropdownItem PreIcon={RiEditLine} closeOnClick={false}>
          Edit Details
        </DropdownItem>
      </DialogTrigger>
      <EditDialogContent />
    </Dialog>
  );
};

export default EditUserDialog;
