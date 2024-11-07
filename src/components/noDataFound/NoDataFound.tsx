import {Text, View} from 'react-native';
import useTheme from '@src/hooks/useTheme';

const NoDataFound = ({item}: {item?: string}) => {
  const {layout, gutters, fonts} = useTheme();
  return (
    <View style={[layout.flex_1, gutters.margin_10]}>
      <Text style={[fonts.black]}>No {item || 'data'} found</Text>
    </View>
  );
};

export default NoDataFound;
