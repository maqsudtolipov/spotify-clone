const Tab = ({ value, children, ...rest }) => {
  if (!value)
    return alert('🚨 Please provide value for Tab component to work properly.');

  return <button {...rest}>{children}</button>;
};

export default Tab;
