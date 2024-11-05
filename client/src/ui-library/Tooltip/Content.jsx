import { useContext } from 'react';
import styles from './Tooltip.module.scss';
import { TooltipContext } from './Tooltip.jsx';

const Content = ({ position = 'bottom', children, ...rest }) => {
  const { isOpen } = useContext(TooltipContext);

  return isOpen ? (
    <span className={`${styles.content} ${styles[position]}`} {...rest}>
      {children}
    </span>
  ) : null;
};

export default Content;
