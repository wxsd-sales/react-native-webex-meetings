import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [navigationDepth, setNavigationDepth] = useState(0);

  const updateDepth = (newDepth) => {
    console.log('Context - Updating Depth:', newDepth);
    setNavigationDepth(newDepth);
  };

  return (
    <NavigationContext.Provider value={{ navigationDepth, setNavigationDepth: updateDepth }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext); 