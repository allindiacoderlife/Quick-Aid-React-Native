import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';
const InitialLayout = () => {
  const router = useRouter();
  const segments = useSegments();

  return (
    <>
      <GestureHandlerRootView>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="auth/user-choice" options={{ headerShown: false }} />
          <Stack.Screen name="auth/register" options={{ headerShown: false }} />
          <Stack.Screen name="auth/login" options={{ headerShown: false }} />
          <Stack.Screen name="auth/profile" options={{ headerShown: false }} />
          <Stack.Screen name="screen/home" options={{ headerShown: false }} />
        </Stack>
      </GestureHandlerRootView>
    </>
  );
};
const rootLayout = () => {
  return <InitialLayout />;
};
export default rootLayout;
