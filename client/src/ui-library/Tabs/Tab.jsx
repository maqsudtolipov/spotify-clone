import styles from './Tabs.module.scss';
import { useContext } from 'react';
import { TabsContext } from './Tabs.jsx';

const Tab = ({ value, children, ...rest }) => {
  if (!value)
    alert('🚨 Please provide value for Tab component to work properly.');

  const { defaultValue, selectedValue, hideUnselected, handleSetValue } =
    useContext(TabsContext);

  const handleClick = () => {
    if (value === selectedValue) {
      handleSetValue(defaultValue);
    } else {
      handleSetValue(value);
    }
  };

  if (hideUnselected && selectedValue.length && selectedValue !== value) {
    return null;
  }

  return (
    <button
      className={`${styles.tab} ${value === selectedValue ? styles.tabSelected : ''}`}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Tab;
