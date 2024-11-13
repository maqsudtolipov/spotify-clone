import { ElementType, ReactNode, useContext } from 'react';
import styles from './Dropdown.module.scss';
import { DropdownContext } from './Dropdown.tsx';

interface DropdownItemProps {
  underline?: boolean;
  PreIcon?: ElementType;
  PostIcon?: ElementType;
  children: ReactNode;
}

const DropdownItem = ({
  underline = false,
  PreIcon,
  PostIcon,
  children,
}: DropdownItemProps) => {
  const { closeDropdown } = useContext(DropdownContext);

  return (
    <li
      className={`${styles.item} ${underline ? styles.underline : ''}`}
      onClick={closeDropdown}
    >
      {PreIcon && <PreIcon className={styles.icon} />}
      <span>{children}</span>
      {PostIcon && (
        <PostIcon className={`${styles.icon} ${styles.iconRight}`} />
      )}
    </li>
  );
};

export default DropdownItem;
