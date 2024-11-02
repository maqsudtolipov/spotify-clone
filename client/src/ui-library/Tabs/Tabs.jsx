import { createContext, useState } from 'react';

const TabsContext = createContext(null);

const Tabs = ({ defaultValue, children, ...props }) => {
  if (!defaultValue)
    return alert(
      '🚨 Please provide default value for Tabs component to work properly.',
    );

  const [value, setValue] = useState(defaultValue);

  return (
    <TabsContext.Provider value={value} {...props}>
      {children}
    </TabsContext.Provider>
  );
};

export default Tabs;
