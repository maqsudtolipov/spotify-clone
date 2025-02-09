import Tooltip from '../../../ui/Tooltip/Tooltip.jsx';
import TooltipTrigger from '../../../ui/Tooltip/TooltipTrigger.jsx';
import TooltipContent from '../../../ui/Tooltip/TooltipContent.jsx';

// Referenced from Tooltip.jsx
const NavTooltip = ({ trigger, position, content }) => {
  return (
    <Tooltip>
      <TooltipTrigger>{trigger}</TooltipTrigger>
      <TooltipContent position={position}>{content}</TooltipContent>
    </Tooltip>
  );
};

export default NavTooltip;
