import styles from './Tabs.module.scss';

const TabsList = ({ children, ...rest }) => {
  return (
    <div className={styles.tabsList} {...rest}>
      {children}
    </div>
  );
};

export default TabsList;
