import {View, StatusBar, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import useTheme from '@hooks/useTheme';

const CustomStatusBar = ({
  showStatusBar = false,
}: {
  showStatusBar?: boolean;
}) => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    statusBar: {
      height: showStatusBar ? insets.top : 0,
      width: '100%',
      backgroundColor: showStatusBar ? colors.blue700 : 'transparent',
    },
  });

  return (
    <View style={styles.statusBar}>
      <StatusBar
        animated
        backgroundColor={styles.statusBar.backgroundColor}
        translucent={!showStatusBar}
      />
    </View>
  );
};

export default CustomStatusBar;
