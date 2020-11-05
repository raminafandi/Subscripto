import React, {useState, useEffect, createContext} from 'react';
import {useColorScheme} from 'react-native-appearance';
import {lightColors, darkColors} from '../constants/colors';

const ThemeContext = createContext({
  isDark: false,
  colors: lightColors,
  setScheme: () => {},
});

const ThemeProvider = ({children, ...props}) => {
  const colorScheme = useColorScheme(); // getting system color
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

  const defaultTheme = {
    isDark,
    colors: isDark ? darkColors : lightColors,
    // Overrides the isDark value will cause re-render inside the context.
    setScheme: (scheme) => setIsDark(scheme === 'dark'),
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to get the theme object returns {isDark, colors, setScheme}
export const useTheme = () => useContext(ThemeContext);

export {ThemeContext, ThemeProvider};
