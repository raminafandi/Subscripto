import React, {useState, useEffect, useContext, createContext} from 'react';
import {useColorScheme} from 'react-native-appearance';
import {lightColors, darkColors} from '../constants/colors';
import AsyncStorage from '@react-native-community/async-storage';

const ThemeContext = createContext({
  isDark: false,
  colors: lightColors,
  setScheme: () => {},
});

const ThemeProvider = ({children, ...props}) => {
  const STORAGE_KEY = '@theme';

  const [colorScheme, setColorScheme] = useState(useColorScheme());

  const getColor = async () => {
    let cs = colorScheme;
    if (
      (await AsyncStorage.getItem(STORAGE_KEY)) === 'dark' ||
      (await AsyncStorage.getItem(STORAGE_KEY)) === 'light'
    ) {
      cs = await AsyncStorage.getItem(STORAGE_KEY);
    } else {
      await AsyncStorage.setItem(STORAGE_KEY, cs);
    }
    return cs;
  };

  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  useEffect(() => {
    getColor().then((cs) => {
      setColorScheme(cs);
    });
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

  const defaultTheme = {
    isDark,
    colors: isDark ? darkColors : lightColors,
    // Overrides the isDark value will cause re-render inside the context.
    setScheme: async (scheme) => {
      setIsDark(scheme === 'dark');
      console.log('scheme', scheme);
      await AsyncStorage.setItem(STORAGE_KEY, scheme);
    },
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
