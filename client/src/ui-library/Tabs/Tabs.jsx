import { createContext, useState } from 'react';

export const TabsContext = createContext(null);

const Tabs = ({ defaultValue = '', children, ...props }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleSetValue = (value) => setSelectedValue(value);

  return (
    <TabsContext.Provider
      value={{ defaultValue, selectedValue, handleSetValue }}
      {...props}
    >
      {children}
    </TabsContext.Provider>
  );
};

export default Tabs;
