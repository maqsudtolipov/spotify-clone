import styles from './Tabs.module.scss';
import { useContext } from 'react';
import { TabsContext } from './Tabs.jsx';

const Tab = ({ value, children, onClick, ...rest }) => {
  const { defaultValue, selectedValue, hideUnselected, handleSetValue } =
    useContext(TabsContext);

  const handleClick = () => {
    onClick && onClick(value === selectedValue ? defaultValue : value);
    handleSetValue(value === selectedValue ? defaultValue : value);
  };

  if (
    hideUnselected &&
    selectedValue !== value &&
    selectedValue !== defaultValue
  ) {
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
