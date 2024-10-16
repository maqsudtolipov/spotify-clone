import Tooltip from '../../components/Tooltip/Tooltip.jsx';

// Referenced from Tooltip.jsx
const NavTooltip = ({ trigger, position, content }) => {
  return (
    <Tooltip>
      <Tooltip.Trigger>{trigger}</Tooltip.Trigger>
      <Tooltip.Content position={position}>{content}</Tooltip.Content>
    </Tooltip>
  );
};

// <Tooltip>
//   <Tooltip.Trigger>
//     <NavButton icon={<RiHome4Line />} />
//   </Tooltip.Trigger>
//   <Tooltip.Content position="bottom">Home</Tooltip.Content>
// </Tooltip>

export default NavTooltip;
