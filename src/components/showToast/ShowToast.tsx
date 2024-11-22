import Toast from 'react-native-toast-message';

const ShowToast = (
  type: 'success' | 'error' | 'info',
  text1: string,
  text2?: string,
) => {
  Toast.show({
    type,
    text1,
    text2,
  });
};

export default ShowToast;
