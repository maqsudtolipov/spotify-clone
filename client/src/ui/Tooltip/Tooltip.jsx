import { createContext, useState } from 'react';
import styles from './Tooltip.module.scss';

export const TooltipContext = createContext(null);

const Tooltip = ({ children, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <TooltipContext.Provider value={{ isOpen, handleOpen, handleClose }}>
      <div className={styles.tooltip} {...rest}>
        {children}
      </div>
    </TooltipContext.Provider>
  );
};

export default Tooltip;
