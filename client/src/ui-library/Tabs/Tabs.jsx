import { createContext, useState } from 'react';

const TabsContext = createContext(null);

const Tabs = ({ defaultValue = '', children, ...props }) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <TabsContext.Provider value={value} {...props}>
      {children}
    </TabsContext.Provider>
  );
};

export default Tabs;
