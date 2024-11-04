import styles from './Tabs.module.scss';
import ArrowButton from './ArrowButton.jsx';

const TabsList = ({ children, ...rest }) => {
  return (
    <div className="relative" {...rest}>
      <div className={styles.tabsList}>{children}</div>
      <ArrowButton />
    </div>
  );
};

export default TabsList;
