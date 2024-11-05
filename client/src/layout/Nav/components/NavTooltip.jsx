import Tooltip from '../../../ui-library/Tooltip/Tooltip.jsx';
import TooltipTrigger from '../../../ui-library/Tooltip/TooltipTrigger.jsx';
import TooltipContent from '../../../ui-library/Tooltip/TooltipContent.jsx';

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
