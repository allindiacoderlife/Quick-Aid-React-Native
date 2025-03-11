import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useEffect, useState, useRef} from 'react';
import Spacing from '../../constants/Spacing';
import FontSize from '../../constants/FontSize';
import Colors from '../../constants/Colors';
import Font from '../../constants/Font';
import Toast from 'components/Toast';
import { Ionicons } from '@expo/vector-icons';
import AppTextInput from './AppTextInput';
import { Link } from 'expo-router';
import { auth, db } from 'auth/firebaseConfig';
import { createUserWithEmailAndPassword , sendEmailVerification} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { defaultStyles } from 'constants/Styles';
const RegisterScreen = ({ userType }) => {

  const  toastRef = useRef();
  
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [nameVerify, setNameVerify] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneVerify, setPhoneVerify] = useState(false);
  const [email, setEmail] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleName = (e) => {
    if (e.length > 0) {
      setFullName(e);
      setNameVerify(true);
    } else {
      setNameVerify(false);
    }
  };
  const handlePhone = (e) => {
    setPhoneNumber(e);
    setPasswordVerify(false);
    if (/^\d{10}$/.test(e)) {
      setPhoneNumber(e);
      setPhoneVerify(true);
    }
  };
  const handleEmail = (e) => {
    if (/\S+@\S+\.\S+/.test(e)) {
      setEmail(e);
      setEmailVerify(true);
    } else {
      setEmailVerify(false);
    }
  };
  const handlePassword = (e) => {
    if (e.length > 6) {
      setPassword(e);
      setPasswordVerify(true);
    } else {
      setPasswordVerify(false);
    }
  };
  const handleConPassword = (e) => {
    setConfirmPassword(e);
  };

  const handleRegister = async () => {
    if (
      nameVerify &&
      phoneVerify &&
      emailVerify &&
      passwordVerify &&
      password === confirmPassword
    ) {
      setLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        await sendEmailVerification(user);
        console.log(user);
        if (user) {
          await setDoc(doc(db, `${userType}`, user.uid), {
            fullName,
            phoneNumber,
            email,
            role: userType,
          });
          console.log('User created successfully');
          const intervalId = setInterval(async () => {
            await user.reload();
            toastRef.current.show({
              type: 'info',
              text: 'Please verify your email',
              duration: 3000,
            })
            if (user.emailVerified) {
              clearInterval(intervalId);
              setLoading(false);
              console.log('Email verified');
              // Navigate to the next screen or show a success message
            }
          }, 3000); // Check every 3 seconds
        }
      } catch (err) {
        if(err.code === 'auth/email-already-in-use'){
          toastRef.current.show({
            type: 'error',
            text: 'Email already in use',
            duration: 3000,
          });
        } else {
          toastRef.current.show({
            type: 'error',
            text: 'Something went wrong',
            duration: 3000,
          });
          console.log(err);
        }
        setLoading(false);
      }
    } else {
      toastRef.current.show({
        type: 'error',
        text: 'Invalid input',
        duration: 3000,
      });
      console.log('Error in registration');
    }
  };

  

  return (
    <SafeAreaView>
      <Toast ref={toastRef} />
      {loading && (
        <View style={defaultStyles.loadingOverlay}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}
      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            padding: Spacing * 2,
          }}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>
              Create an account so you can explore all the existing jobs
            </Text>
          </View>
          <View
            style={{
              marginVertical: Spacing * 3,
            }}>
            <AppTextInput placeholder="Full Name" onChangeText={(e) => handleName(e)} />
            <AppTextInput placeholder="Phone Number" onChangeText={(e) => handlePhone(e)} />
            <AppTextInput placeholder="Email" onChangeText={(e) => handleEmail(e)} />
            <AppTextInput
              placeholder="Password"
              onChangeText={(e) => handlePassword(e)}
              secureTextEntry
            />
            <AppTextInput
              placeholder="Confirm Password"
              onChangeText={(e) => handleConPassword(e)}
              secureTextEntry
            />
          </View>
          <TouchableOpacity style={styles.buttonStyle} onPress={handleRegister}>
            <Text style={styles.ButtonText}>Sign up</Text>
          </TouchableOpacity>
          <Link href={{ pathname: 'auth/login', params: { role: userType } }} asChild>
            <TouchableOpacity
              style={{
                padding: Spacing,
              }}>
              <Text style={styles.subtitle}>Already have an account</Text>
            </TouchableOpacity>
          </Link>
          <View
            style={{
              marginVertical: Spacing * 3,
            }}>
            <Text style={styles.subtitle}>Or continue with</Text>

            <View
              style={{
                marginTop: Spacing,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <TouchableOpacity style={styles.IconButton}>
                <Ionicons name="logo-google" color={Colors.text} size={Spacing * 2} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.IconButton}>
                <Ionicons name="logo-apple" color={Colors.text} size={Spacing * 2} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.IconButton}>
                <Ionicons name="logo-facebook" color={Colors.text} size={Spacing * 2} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: FontSize.xLarge,
    color: Colors.primary,
    fontFamily: Font['poppins-bold'],
    marginVertical: Spacing * 3,
  },
  subtitle: {
    fontFamily: Font['poppins-regular'],
    fontSize: FontSize.small,
    maxWidth: '80%',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontFamily: Font['poppins-regular'],
    fontSize: FontSize.small,
  },
  buttonStyle: {
    padding: Spacing * 2,
    backgroundColor: Colors.primary,
    marginVertical: Spacing * 3,
    borderRadius: Spacing,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
  },
  ButtonText: {
    fontFamily: Font['poppins-bold'],
    color: Colors.onPrimary,
    textAlign: 'center',
    fontSize: FontSize.large,
  },
  subtitle: {
    fontFamily: Font['poppins-semiBold'],
    color: Colors.text,
    textAlign: 'center',
    fontSize: FontSize.small,
  },
  IconButton: {
    padding: Spacing,
    backgroundColor: Colors.gray,
    borderRadius: Spacing / 2,
    marginHorizontal: Spacing,
  },
});
