import React from 'react';
import {Pressable, Text, View} from 'react-native';

import {headerStyles} from './styles';

const Header: React.FC<PageHeaderProps> = ({
  leftNode = null,
  rightNode = null,
  headerText = '',
  handleOnPressLeftNode = null,
  handleOnPressRightNode = null,
  rightContainerStyle = null,
  leftContainerStyle = null,
}) => {
  const styles = headerStyles();

  return (
    <View>
      <View style={styles.container}>
        <Pressable
          onPress={handleOnPressLeftNode}
          style={[styles.leftNodeStyle, leftContainerStyle]}>
          {leftNode}
        </Pressable>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{headerText}</Text>
        </View>
        <Pressable
          onPress={handleOnPressRightNode}
          style={[styles.rightNodeStyle, rightContainerStyle]}>
          {rightNode}
        </Pressable>
      </View>
      <View style={styles.bottomBorder} />
    </View>
  );
};

export default Header;
