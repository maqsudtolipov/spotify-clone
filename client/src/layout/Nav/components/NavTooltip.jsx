import Tooltip from '../../../ui-library/Tooltip/Tooltip.jsx';

// Referenced from Tooltip.jsx
const NavTooltip = ({ trigger, position, content }) => {
  return (
    <Tooltip>
      <Tooltip.Trigger>{trigger}</Tooltip.Trigger>
      <Tooltip.Content position={position}>{content}</Tooltip.Content>
    </Tooltip>
  );
};

export default NavTooltip;
