import {View} from 'react-native';
import useTheme from '@hooks/useTheme';

const BaseContainer = ({children}: {children: React.ReactNode}) => {
  const {layout, backgrounds} = useTheme();
  return <View style={[layout.flex_1, backgrounds.white]}>{children}</View>;
};

export default BaseContainer;
