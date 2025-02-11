import { ReactNode, useContext } from 'react';
import { TooltipContext } from './Tooltip.tsx';

interface TooltipTriggerProps {
  children: ReactNode;
}

const TooltipTrigger = ({ children }: TooltipTriggerProps) => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error('TooltipTrigger should be used within the Tooltip');
  }
  const { handleOpen, handleClose } = context;

  return (
    <div onMouseEnter={handleOpen} onMouseLeave={handleClose}>
      {children}
    </div>
  );
};

export default TooltipTrigger;
