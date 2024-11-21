import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  DeviceEventEmitter,
  TouchableWithoutFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

import {dropdownStyles} from './styles';

const Dropdown = ({
  data,
  value,
  onSelectIndex,
  placeholder,
  shouldScroll,
  dropdownStyle,
  style,
}: DropdownProps) => {
  const styles = dropdownStyles();
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    const touchEvent = DeviceEventEmitter.addListener('touch', () => {
      setIsFocus(false);
    });

    return () => {
      touchEvent.remove();
    };
  }, []);

  const handleSelect = (value: ListInfo) => {
    setIsFocus(false);
    onSelectIndex?.(value);
  };

  return (
    <View>
      <TouchableWithoutFeedback
        style={style}
        onPress={() => setIsFocus(!isFocus)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}>
        <View style={[styles.dropdown, isFocus ? styles.focusDd : undefined]}>
          <Text style={[styles.ddValue, !value ? styles.placeholder : null]}>
            {value ? value?.name : placeholder}
          </Text>
          <Icon color={'black'} name="chevron-small-down" size={20} />
        </View>
      </TouchableWithoutFeedback>
      {isFocus ? (
        <ScrollView
          style={[styles.dropdownList, dropdownStyle]}
          scrollEnabled={shouldScroll ?? false}
          showsVerticalScrollIndicator={false}>
          {data.map((value: ListInfo) => (
            <TouchableOpacity
              key={value?.id}
              style={styles.data}
              onPress={() => handleSelect(value)}>
              <Text style={styles.dataText}>{value?.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : undefined}
    </View>
  );
};

export default Dropdown;
