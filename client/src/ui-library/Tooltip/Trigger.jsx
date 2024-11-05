import { useContext } from 'react';
import { TooltipContext } from './Tooltip.jsx';

const Trigger = ({ children, rest }) => {
  const { handleOpen, handleClose } = useContext(TooltipContext);

  return (
    <div onMouseEnter={handleOpen} onMouseLeave={handleClose} {...rest}>
      {children}
    </div>
  );
};

export default Trigger;
