import {ActivityIndicator, View} from 'react-native';

import useTheme from '@hooks/useTheme';

import {styles} from './styles';

const Loader = ({
  size,
  color,
  bgColor,
}: {
  size?: number | 'small' | 'large';
  color?: string;
  bgColor?: string;
}) => {
  const {colors} = useTheme();
  return (
    <View style={[styles().container, {backgroundColor: bgColor ?? 'white'}]}>
      <ActivityIndicator
        size={size || 'large'}
        color={color || colors.fixedblue700}
      />
    </View>
  );
};

export default Loader;
