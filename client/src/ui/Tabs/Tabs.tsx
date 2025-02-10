import { createContext, ReactNode, useState } from 'react';

interface TabsContextValue {
  defaultValue: string;
  selectedValue: string;
  hideUnselected: boolean;
  handleSetValue: (value: string) => void;
}

export const TabsContext = createContext<TabsContextValue | null>(null);

interface TabsProps {
  defaultValue: string;
  hideUnselected: boolean;
  children: ReactNode;
}

const Tabs = ({
  defaultValue = '',
  hideUnselected = false,
  children,
}: TabsProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleSetValue = (value: string) => setSelectedValue(value);

  return (
    <TabsContext.Provider
      value={{
        defaultValue,
        selectedValue,
        hideUnselected,
        handleSetValue,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};

export default Tabs;
