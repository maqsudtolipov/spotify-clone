import Tooltip from '../../../ui-library/Tooltip/Tooltip.jsx';

// Referenced from Tooltip.jsx
const NavTooltip = ({ trigger, position, content }) => {
  return (
    <Tooltip>
      <Tooltip>{trigger}</Tooltip>
      <Tooltip position={position}>{content}</Tooltip>
    </Tooltip>
  );
};

export default NavTooltip;
