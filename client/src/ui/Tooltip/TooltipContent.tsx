import { ReactNode, useContext } from 'react';
import styles from './Tooltip.module.scss';
import { TooltipContext } from './Tooltip.tsx';

interface TooltipContentProps {
  position:
    | 'left'
    | 'right'
    | 'top'
    | 'top-left'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right';
  children: ReactNode;
}

const TooltipContent = ({
  position = 'bottom',
  children,
}: TooltipContentProps) => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error('TooltipContext should be used within the Tooltip');
  }
  const { isOpen } = context;

  return isOpen ? (
    <span className={`${styles.content} ${styles[position]}`}>{children}</span>
  ) : null;
};

export default TooltipContent;
