import { createContext, useState } from 'react';

export const TabsContext = createContext(null);

const Tabs = ({
  defaultValue = '',
  hideUnselected = false,
  children,
  ...rest
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const handleSetValue = (value) => setSelectedValue(value);

  return (
    <TabsContext.Provider
      value={{
        defaultValue,
        hideUnselected,
        selectedValue,
        handleSetValue,
      }}
      {...rest}
    >
      {children}
    </TabsContext.Provider>
  );
};

export default Tabs;
