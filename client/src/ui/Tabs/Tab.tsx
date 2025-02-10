import styles from './Tab.module.scss';
import { ReactNode, useContext } from 'react';
import { TabsContext } from './Tabs.tsx';

interface TabProps {
  value: string;
  children: ReactNode;
  onClick?: (s: string) => void;
}

const Tab = ({ value, children, onClick }: TabProps) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tab should be used within the Tabs');
  }
  const { defaultValue, selectedValue, hideUnselected, handleSetValue } =
    context;

  // TODO: hard to understand
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
    <button className={buttonClass} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Tab;
