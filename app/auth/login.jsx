import { View, Text } from 'react-native';
import React from 'react';
import LoginScreen from 'components/Auth/LoginScreen';
import { useLocalSearchParams } from 'expo-router';
const Login = () => {
  const { role } = useLocalSearchParams();
  return (
    <View>
        <LoginScreen userType={role} />
    </View>
  );
};

export default Login;
