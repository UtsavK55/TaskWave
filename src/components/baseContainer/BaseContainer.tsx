import {View} from 'react-native';

import useTheme from '@hooks/useTheme';

const BaseContainer = ({
  children,
  bgColor,
}: {
  children: React.ReactNode;
  bgColor?: string;
}) => {
  const {layout, colors} = useTheme();
  return (
    <View style={[layout.flex_1, {backgroundColor: bgColor ?? colors.white}]}>
      {children}
    </View>
  );
};

export default BaseContainer;
