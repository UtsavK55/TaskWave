import Icon from 'react-native-vector-icons/MaterialIcons';
import useTheme from '@hooks/useTheme';

const HeaderIcon = ({
  name,
  size,
  color,
}: {
  name: string;
  size?: number;
  color?: string;
}) => {
  const {colors} = useTheme();
  return <Icon name={name} size={size || 24} color={color || colors.white} />;
};

export default HeaderIcon;
