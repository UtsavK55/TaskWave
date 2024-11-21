import React from 'react';
import {Modal, Pressable, View} from 'react-native';

import Header from '@components/header';
import HeaderIcon from '@components/headerIcon';

import {customModalStyles} from './styles';

const CustomModal: React.FC<CustomModalProps> = ({
  children,
  visible,
  onPressClear,
  onPressCheck,
}) => {
  const styles = customModalStyles();
  return (
    <View>
      <Modal visible={visible} transparent animationType="none">
        <Pressable style={styles.overlay} onPress={onPressClear}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Header
                headerText="Move card"
                leftNode={<HeaderIcon name="clear" />}
                rightNode={<HeaderIcon name="check" />}
                handleOnPressLeftNode={onPressClear}
                handleOnPressRightNode={onPressCheck}
              />
              {children}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default CustomModal;
