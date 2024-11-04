import styles from './Tabs.module.scss';
import { useContext } from 'react';
import { TabsContext } from './Tabs.jsx';

const Tab = ({ value, children, ...rest }) => {
  const { defaultValue, selectedValue, hideUnselected, handleSetValue } =
    useContext(TabsContext);

  const handleClick = () => {
    handleSetValue(value === selectedValue ? defaultValue : value);
  };

  if (hideUnselected && selectedValue.length && selectedValue !== value) {
    return null;
  }

  const isSelected = value === selectedValue;
  const buttonClass = `${styles.tab} ${isSelected ? styles.tabSelected : ''}`;

  return (
    <button className={buttonClass} onClick={handleClick} {...rest}>
      {children}
    </button>
  );
};

export default Tab;
