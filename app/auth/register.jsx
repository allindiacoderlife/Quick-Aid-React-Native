import { View, Text } from 'react-native'
import RegisterScreen from 'components/Auth/RegisterScreen'
import { useLocalSearchParams } from 'expo-router';
import React from 'react'

const Register = () => {
    const { role } = useLocalSearchParams();
  return (
    <View>
        <RegisterScreen userType={role}/>
    </View>
  )
}

export default Register