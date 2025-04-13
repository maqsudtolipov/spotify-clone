import styles from './RoleCheckbox.module.scss';
import { UseFormRegisterReturn } from 'react-hook-form';
import Tooltip from '../../../../ui/Tooltip/Tooltip.tsx';
import TooltipTrigger from '../../../../ui/Tooltip/TooltipTrigger.tsx';
import TooltipContent from '../../../../ui/Tooltip/TooltipContent.tsx';

interface RoleCheckboxProps {
  register: UseFormRegisterReturn;
}

const RoleCheckbox = ({ register }: RoleCheckboxProps) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <div className={styles.container}>
          <input
            className={styles.checkbox}
            type="checkbox"
            id="isArtist"
            {...register}
          />
          <label className={styles.label} htmlFor="isArtist">
            Become artist
          </label>
        </div>
      </TooltipTrigger>
      <TooltipContent position="top">
        Artists can upload songs and access tools like the admin dashboard.
      </TooltipContent>
    </Tooltip>
  );
};

export default RoleCheckbox;
