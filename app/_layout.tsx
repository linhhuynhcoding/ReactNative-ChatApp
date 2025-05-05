import { DarkTheme, DefaultTheme, ThemeProvider, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import "@/global.css";
import Toast from 'react-native-toast-message';

import { useColorScheme } from '@/hooks/useColorScheme';
import { LogBox, View } from 'react-native';
import Header from '@/components/Header';
import { QueryProvider } from '@/components/query-provider';
import { AppProvider } from '@/context/AppContext';
import { UserInactivityProvider } from '@/context/UserInactivity';
import { MenuProvider } from 'react-native-popup-menu';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
function InitialLayout() {
  // LogBox.ignoreLogs([
  //   'props.pointerEvents is deprecated. Use style.pointerEvents',
  // ]);

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ header: () => (<Header tittle='Đăng nhập'></Header>) }} />
          <Stack.Screen name="register" options={{ header: () => (<Header tittle='Đăng ký tài khoản'></Header>) }} />

          <Stack.Screen name="(authenticated)/(tabs)" options={{
            header: () =>
              (<Header isSearch={true}></Header>)
          }} />
          <Stack.Screen name="(authenticated)/conversation/[id]" options={{
            header: () =>
              (<Header isChat={true} backPath='(authenticated)/(tabs)' ></Header>),
          }} />

          <Stack.Screen
            name="(authenticated)/(menu)/addfriend"
            options={{
              header: () => <Header tittle='Thêm bạn'></Header>
            }}
          >
          </Stack.Screen>
          
          <Stack.Screen
            name="(authenticated)/(profile)/[email]"
            options={{
              header: () => <Header></Header>
            }}
          >
          </Stack.Screen>

          <Stack.Screen name="+not-found" />

        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </>
  );
}

const RootLayoutNav = () => {
  return (
    <AppProvider>
      <UserInactivityProvider>
        <QueryProvider>
          <MenuProvider>
            <InitialLayout>
            </InitialLayout>
            <Toast />
          </MenuProvider>
        </QueryProvider>
      </UserInactivityProvider>
    </AppProvider>


  )

}

export default RootLayoutNav;