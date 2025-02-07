import { ElementType, ReactNode, useContext } from 'react';
import styles from './Dropdown.module.scss';
import { DropdownContext } from './Dropdown.tsx';

interface DropdownItemProps {
  closeOnClick?: boolean;
  underline?: boolean;
  isHighlighted?: boolean;
  PreIcon?: ElementType | null;
  PostIcon?: ElementType | null;
  onClick?: () => void;
  children: ReactNode;
}

// FIXME: 😁 I don't know whats happening here
const DropdownItem = ({
  underline = false,
  isHighlighted = false,
  PreIcon,
  PostIcon,
  closeOnClick = true,
  onClick: propOnClick,
  children,
  ...rest
}: DropdownItemProps) => {
  const { closeDropdown } = useContext(DropdownContext);

  return (
    <li
      className={`${styles.item} ${underline ? styles.underline : ''} ${isHighlighted ? styles.highlighted : ''}`}
      onClick={() => {
        propOnClick && propOnClick();
        closeOnClick && closeDropdown();
      }}
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
