import { createContext, useContext, useState } from 'react';

interface ColorSchemeContextValue { 
  colorScheme: string; 
  setColorScheme: React.Dispatch<React.SetStateAction<string>>;
}

interface Props { 
  children: React.ReactNode; 
}

const ColorSchemeContext = createContext<ColorSchemeContextValue>({
  colorScheme: 'light',
  setColorScheme: () => {},
}); 

export const ColorSchemeProvider: React.FC<Props> = ({ children }) => { 
  const [colorScheme, setColorScheme] = useState('light');

  return (
    <ColorSchemeContext.Provider value={{colorScheme, setColorScheme}}> {children}</ColorSchemeContext.Provider>
  )
}

export const useColorSchemeContext = () => useContext(ColorSchemeContext)