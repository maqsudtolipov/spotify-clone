import styles from './Tabs.module.scss';

const Tab = ({ value, children, ...rest }) => {
  if (!value)
    return alert('🚨 Please provide value for Tab component to work properly.');

  return (
    <button className={styles.tab} {...rest}>
      {children}
    </button>
  );
};

export default Tab;
