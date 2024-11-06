import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {useColorScheme} from 'react-native';

import {STORAGE_KEYS} from '@constants';
import {getData, storeData} from '@storage';

import generateConfig from '@theme/generateConfig';
import {generateBackgrounds} from '@theme/backgrounds';
import {
  generateBorderColors,
  generateBorderRadius,
  generateBorderWidths,
} from '@theme/borders';
import {
  generateFontColors,
  generateFontSizes,
  staticFontStyles,
} from '@theme/fonts';
import {generateGutters, staticGutterStyles} from '@theme/gutters';
import layout from '@theme/layout';

export const ThemeContext = createContext<ThemeContext | undefined>(undefined);

const ThemeProvider: React.FC<{children: ReactNode}> = ({children}) => {
  
  const colorScheme = useColorScheme();
  const [variant, setVariant] = useState<Variant>(
    colorScheme === 'dark' ? 'dark' : 'default',
  );
  const fetchTheme = async () => {
    const appHasThemeDefined = await getData(STORAGE_KEYS.DARK_MODE);
    if (!appHasThemeDefined) {
      storeData('default', STORAGE_KEYS.DARK_MODE);
      setVariant('default');
    }
  };

  useEffect(() => {
    fetchTheme();
  }, [variant]);

  const changeTheme = useCallback((nextVariant: Variant) => {
    setVariant(nextVariant);
    storeData(nextVariant, STORAGE_KEYS.DARK_MODE);
  }, []);

  const fullConfig = useMemo(() => {
    return generateConfig(
      variant as Variant,
    ) satisfies FulfilledThemeConfiguration;
  }, [variant]);

  const fonts = useMemo(() => {
    return {
      ...generateFontSizes(),
      ...generateFontColors(fullConfig),
      ...staticFontStyles,
    };
  }, [fullConfig]);

  const backgrounds = useMemo(() => {
    return {
      ...generateBackgrounds(fullConfig),
    };
  }, [fullConfig]);

  const gutters = useMemo(() => {
    return {
      ...generateGutters(fullConfig),
      ...staticGutterStyles,
    };
  }, [fullConfig]);

  const borders = useMemo(() => {
    return {
      ...generateBorderColors(fullConfig),
      ...generateBorderRadius(),
      ...generateBorderWidths(),
    };
  }, [fullConfig]);

  const theme = useMemo(() => {
    return {
      colors: fullConfig.colors,
      variant,
      gutters,
      layout,
      fonts,
      backgrounds,
      borders,
    };
  }, [variant, fonts, backgrounds, borders, fullConfig.colors, gutters]);

  const value = useMemo(() => {
    return {...theme, changeTheme};
  }, [theme, changeTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
