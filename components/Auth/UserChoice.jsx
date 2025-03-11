import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import Spacing from '../../constants/Spacing';
import Colors from '../../constants/Colors';
import FontSize from '../../constants/FontSize';
import Font from '../../constants/Font';
import { useRouter, Link } from 'expo-router';
const { height } = Dimensions.get('window');
const UserChoice = () => {
  const router = useRouter();

  return (
    <View style={{ marginTop: Spacing * 2 }}>
      <LottieView
        source={require('../../assets/animation/Lottie1.json')}
        style={{ height: height / 2.5 }}
        resizeMode="contain"
        autoPlay
        loop
      />
      <View style={{ paddingHorizontal: Spacing * 4, paddingTop: Spacing * 10 }}>
        <Text style={styles.title}>Choose Your Account Type</Text>
        <Text style={styles.subtitle}>Are you a doctor or a patient?</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Link
          href={{
            pathname: 'auth/login',
            params: { role: 'doctor' },
          }}
          asChild>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.textStyle}>Doctor</Text>
          </TouchableOpacity>
        </Link>
        <Link
          href={{
            pathname: 'auth/login',
            params: { role: 'patient' },
          }}
          asChild>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.textStyle}>Patient</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: FontSize.xxLarge,
    color: Colors.primary,
    fontFamily: Font['poppins-bold'],
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSize.small,
    color: Colors.text,
    fontFamily: Font['poppins-regular'],
    textAlign: 'center',
    marginTop: Spacing * 2,
  },
  buttonContainer: {
    paddingHorizontal: Spacing * 2,
    paddingTop: Spacing * 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing * 2,
  },
  buttonStyle: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing * 1.5,
    paddingHorizontal: Spacing * 2,
    width: '48%',
    borderRadius: Spacing,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
  },
  textStyle: {
    fontFamily: Font['poppins-bold'],
    color: Colors.onPrimary,
    fontSize: FontSize.large,
    textAlign: 'center',
  },
});

export default UserChoice;
