import {useContext} from 'react';
import {ThemeContext} from '@contexts/ThemeProvider';

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

export default useTheme;

export const createThemedStyles = (
  styleFunction: (theme: ThemeContext) => Record<string, any>,
) => {
  return () => {
    const theme = useTheme();
    return styleFunction(theme);
  };
};
