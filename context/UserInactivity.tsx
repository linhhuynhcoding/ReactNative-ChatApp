import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { useAppContext } from "./AppContext";

export const UserInactivityProvider = ({ children }: any) => {
     const appState = useRef(AppState.currentState);
     const router = useRouter();
     const { isAuth } = useAppContext();

     useEffect(() => {
          const subscription = AppState.addEventListener('change', handleAppStateChange);

          return () => {
               subscription.remove();
          };
     }, []);

     const handleAppStateChange = async (nextAppState: AppStateStatus) => {
          console.log('🚀 ~ handleAppStateChange ~ nextAppState', nextAppState);

          if (nextAppState === 'active' && appState.current.match(/background/)) {
               console.log("🚀 ~ handleAppStateChange ~ isAuth:", isAuth)
               if (isAuth) {
                    router.replace('/(authenticated)/(tabs)');
               }
          }
          appState.current = nextAppState;
     };


     return children;
};