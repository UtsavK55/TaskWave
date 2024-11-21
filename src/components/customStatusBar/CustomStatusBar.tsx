import {View, StatusBar, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import useTheme from '@hooks/useTheme';

const CustomStatusBar = () => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    statusBar: {
      height: insets.top,
      width: '100%',
      backgroundColor: colors.blue700,
    },
  });

  return (
    <View style={styles.statusBar}>
      <StatusBar animated backgroundColor={styles.statusBar.backgroundColor} />
    </View>
  );
};

export default CustomStatusBar;
