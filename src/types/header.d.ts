import {GestureResponderEvent, ViewProps} from 'react-native';

declare global {
  interface PageHeaderProps {
    leftNode?: JSX.Element;
    rightNode?: JSX.Element;
    headerText?: string;
    handleOnPressLeftNode?: (event: GestureResponderEvent) => void;
    handleOnPressRightNode?: (event: GestureResponderEvent) => void;
    rightContainerStyle?: ViewProps['style'] | null;
    leftContainerStyle?: ViewProps['style'] | null;
  }
}
