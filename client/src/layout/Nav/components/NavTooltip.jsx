import Tooltip from '../../../ui/Tooltip/Tooltip.tsx';
import TooltipTrigger from '../../../ui/Tooltip/TooltipTrigger.tsx';
import TooltipContent from '../../../ui/Tooltip/TooltipContent.tsx';

// Referenced from Tooltip.tsx
const NavTooltip = ({ trigger, position, content }) => {
  return (
    <Tooltip>
      <TooltipTrigger>{trigger}</TooltipTrigger>
      <TooltipContent position={position}>{content}</TooltipContent>
    </Tooltip>
  );
};

export default NavTooltip;
