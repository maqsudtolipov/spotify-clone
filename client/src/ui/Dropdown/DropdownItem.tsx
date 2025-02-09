import { ElementType, ReactNode, useContext } from 'react';
import styles from './DropdownItem.module.scss';
import { DropdownContext } from './Dropdown.tsx';

interface DropdownItemProps {
  children: ReactNode;
  closeOnClick?: boolean;
  underline?: boolean;
  isHighlighted?: boolean;
  PreIcon?: ElementType | null;
  PostIcon?: ElementType | null;
  onClick?: () => void;
}

const DropdownItem = ({
  underline = false,
  isHighlighted = false,
  PreIcon,
  PostIcon,
  closeOnClick = true,
  onClick: propOnClick,
  children,
}: DropdownItemProps) => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('DropdownList should be used within the Dropdown');
  }
  const { closeDropdown } = context;

  const handleClick = () => {
    propOnClick && propOnClick();
    closeOnClick && closeDropdown();
  };

  const className = `${styles.item} ${underline ? styles.underline : ''} ${isHighlighted ? styles.highlighted : ''}`;

  return (
    <li className={className} onClick={handleClick}>
      {PreIcon && <PreIcon className={styles.icon} />}
      <span>{children}</span>
      {PostIcon && (
        <PostIcon className={`${styles.icon} ${styles.iconRight}`} />
      )}
    </li>
  );
};

export default DropdownItem;
