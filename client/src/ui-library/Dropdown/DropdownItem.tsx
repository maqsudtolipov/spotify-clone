import { ElementType, ReactNode, useContext } from 'react';
import styles from './Dropdown.module.scss';
import { DropdownContext } from './Dropdown.tsx';

interface DropdownItemProps {
  underline?: boolean;
  isHighlighted?: boolean;
  PreIcon?: ElementType | null;
  PostIcon?: ElementType | null;
  onClick?: () => void;
  children: ReactNode;
}

const DropdownItem = ({
  underline = false,
  isHighlighted = false,
  PreIcon,
  PostIcon,
  children,
  ...rest
}: DropdownItemProps) => {
  const { closeDropdown } = useContext(DropdownContext);

  return (
    <li
      className={`${styles.item} ${underline ? styles.underline : ''} ${isHighlighted ? styles.highlighted : ''}`}
      onClick={closeDropdown}
      {...rest}
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
