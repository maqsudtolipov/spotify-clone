import { createContext, useContext, useState } from 'react';
import styles from './Tooltip.module.scss';

const TooltipContext = createContext(null);

const Tooltip = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <TooltipContext.Provider value={{ isOpen, onOpen, onClose }}>
      <div className={styles.tooltip}>{children}</div>
    </TooltipContext.Provider>
  );
};

const Trigger = ({ children }) => {
  const { onOpen, onClose } = useContext(TooltipContext);

  return (
    <div onMouseEnter={onOpen} onMouseLeave={onClose}>
      {children}
    </div>
  );
};

const Content = ({ position = 'bottom', children }) => {
  const { isOpen } = useContext(TooltipContext);

  return isOpen ? (
    <span className={`${styles.content} ${styles[position]}`}>{children}</span>
  ) : null;
};

Tooltip.Trigger = Trigger;
Tooltip.Content = Content;

export default Tooltip;
