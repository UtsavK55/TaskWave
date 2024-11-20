import {SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import CustomStatusBar from '@components/customStatusBar';
import useTheme from '@hooks/useTheme';

const BaseContainer = ({
  children,
  showStatusBar = true,
  bgColor = 'white',
}: {
  children: React.ReactNode;
  showStatusBar?: boolean;
  bgColor?: string;
}) => {
  const {layout} = useTheme();
  return (
    <SafeAreaProvider>
      <CustomStatusBar showStatusBar={showStatusBar} />
      <SafeAreaView style={[layout.flex_1, {backgroundColor: bgColor}]}>
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default BaseContainer;
