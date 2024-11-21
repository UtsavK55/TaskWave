import {Text, TextStyle, View} from 'react-native';

import useTheme from '@hooks/useTheme';

const NoDataFound = ({item, style}: {item?: string; style?: TextStyle}) => {
  const {layout, gutters, fonts} = useTheme();
  return (
    <View style={[layout.flex_1, gutters.margin_10,]}>
      <Text style={[fonts.black, style]}>No {item || 'data'} found</Text>
    </View>
  );
};

export default NoDataFound;
