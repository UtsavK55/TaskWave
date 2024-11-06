import React from 'react';
import {Image, Linking, Text, TouchableOpacity, View} from 'react-native';

import ShowToast from '@components/showToast';
import {logoImg} from '@constants';
import useTheme from '@hooks/useTheme';
import {loginUrl} from '@network/apiUrls';

import {loginStyles} from './styles';

const Login = () => {
  
  const styles = loginStyles();
  const {gutters} = useTheme();

  const handleLogin = async () => {
    const url = loginUrl;
    try {
      await Linking.openURL(url);
    } catch {
      ShowToast(
        'error',
        'Login Error',
        'Cannot login curretly. Please try again after some time',
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={gutters.marginHorizontal_12}>
        <Text style={styles.welcomeTitle}>Welcome To</Text>
        <View style={styles.imageContainer}>
          <Image source={logoImg} resizeMode="contain" style={styles.image} />
        </View>
        <Text style={styles.appTitle}>TaskWave</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>Move teamwork forward - even on the go</Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.buttonText}>Log in</Text>
          <Text style={styles.termText}>
            By logging in, you agree to our Terms of service and Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Login;
