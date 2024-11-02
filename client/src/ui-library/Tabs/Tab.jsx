import styles from './Tabs.module.scss';
import { useContext } from 'react';
import { TabsContext } from './Tabs.jsx';

const Tab = ({ value, children, ...rest }) => {
  if (!value)
    return alert('🚨 Please provide value for Tab component to work properly.');

  const { selectedValue, handleChangeValue } = useContext(TabsContext);

  return (
    <button
      className={`${styles.tab} ${value === selectedValue ? styles.tabSelected : ''}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Tab;
