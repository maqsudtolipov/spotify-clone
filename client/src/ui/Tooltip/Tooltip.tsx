import { createContext, ReactNode, useState } from 'react';
import styles from './Tooltip.module.scss';

interface TooltipContextValue {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

export const TooltipContext = createContext<TooltipContextValue | null>(null);

interface TooltipProps {
  
  children: ReactNode;
}

const Tooltip = ({ children }: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <TooltipContext.Provider value={{ isOpen, handleOpen, handleClose }}>
      <div className={styles.tooltip}>{children}</div>
    </TooltipContext.Provider>
  );
};

export default Tooltip;
