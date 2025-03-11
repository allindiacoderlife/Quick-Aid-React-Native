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
import { useState } from 'react';
import Spacing from '../../constants/Spacing';
import FontSize from '../../constants/FontSize';
import Colors from '../../constants/Colors';
import Font from '../../constants/Font';
import { defaultStyles } from 'constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import AppTextInput from './AppTextInput';
import { Link , useRouter} from 'expo-router';
import { auth, db } from 'auth/firebaseConfig';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ userType }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailVerify, setEmailVerify] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState(false);

  const router = useRouter();

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

  const handleLogin = async () => {
    if (emailVerify && passwordVerify) {
      setLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await sendEmailVerification(user);
        setLoading(false);
        router.push('screen/home');
        console.log(user);
        console.log('Logged in successfully');
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };
  return (
    <SafeAreaView>
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
            <Text style={styles.title}>Login here</Text>
            <Text style={styles.subtitle}>
              {userType === 'doctor'
                ? 'Welcome back doctor!'
                : userType === 'patient'
                  ? 'Welcome back patient!'
                  : 'Welcome back!'}
            </Text>
          </View>
          <View
            style={{
              marginVertical: Spacing * 3,
            }}>
            <AppTextInput placeholder="Email" onChangeText={(e) => handleEmail(e)} />
            <AppTextInput
              placeholder="Password"
              secureTextEntry
              onChangeText={(e) => handlePassword(e)}
            />
          </View>

          <View>
            <Text style={styles.smallText}>Forgot your password ?</Text>
          </View>
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginText}>Sign in</Text>
          </TouchableOpacity>
          <Link href={{ pathname: 'auth/register', params: { role: userType } }} asChild>
            <TouchableOpacity
              style={{
                padding: Spacing,
              }}>
              <Text style={styles.createText}>Create new account</Text>
            </TouchableOpacity>
          </Link>

          <View
            style={{
              marginVertical: Spacing * 3,
            }}>
            <Text style={styles.continueText}>Or continue with</Text>

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

export default LoginScreen;

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
  smallText: {
    fontFamily: Font['poppins-semiBold'],
    fontSize: FontSize.small,
    color: Colors.primary,
    alignSelf: 'flex-end',
  },
  loginButton: {
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
  loginText: {
    fontFamily: Font['poppins-bold'],
    color: Colors.onPrimary,
    textAlign: 'center',
    fontSize: FontSize.large,
  },
  createText: {
    fontFamily: Font['poppins-semiBold'],
    color: Colors.text,
    textAlign: 'center',
    fontSize: FontSize.small,
  },
  continueText: {
    fontFamily: Font['poppins-semiBold'],
    color: Colors.primary,
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
