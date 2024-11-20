import Icon from 'react-native-vector-icons/MaterialIcons';

import useTheme from '@hooks/useTheme';
import useScalingMetrics from '@hooks/useScalingMetrics';

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
  const {scaleSize} = useScalingMetrics();
  return (
    <Icon
      name={name}
      size={scaleSize(size || 24)}
      color={color || colors.fixedWhite}
    />
  );
};

export default HeaderIcon;
