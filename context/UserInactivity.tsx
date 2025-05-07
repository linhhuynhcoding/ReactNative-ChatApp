import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { useAppContext } from "./AppContext";
import { bootstrap, SocketService } from "@/services/socket.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMessageStore } from "@/store/zustand";


export const UserInactivityProvider = ({ children }: any) => {
     const appState = useRef(AppState.currentState);
     const router = useRouter();
     const { isAuth, setSocket, socket } = useAppContext();
     const socketRef = useRef(socket);
     const isAuthRef = useRef(isAuth);

     useEffect(() => {
          socketRef.current = socket;
     }, [socket]);

     useEffect(() => {
          isAuthRef.current = isAuth;
     }, [isAuth]);

     const { updateMessage } = useMessageStore();

     useEffect(() => {
          const subscription = AppState.addEventListener('change', handleAppStateChange);

          return () => {
               subscription.remove();
          };
     }, []);

     const handleAppStateChange = async (nextAppState: AppStateStatus) => {
          console.log('🚀 ~ handleAppStateChange ~ nextAppState', nextAppState);
          console.log("🚀 ~ handleAppStateChange ~ isAuth:", isAuthRef.current)
          console.log("🚀 ~ handleAppStateChange ~ socket:", socketRef.current)

          if (appState.current.match(/inactive|background/) && nextAppState === 'active') {

               if (isAuthRef.current && socketRef.current === null) {

                    const token = await AsyncStorage.getItem('access_token');

                    if (!token) {
                         console.log("🚀 ~ handleAppStateChange ~ token", token)

                    }
                    else {
                         bootstrap(token, setSocket, updateMessage);
                    }

                    router.replace('/(authenticated)/(tabs)');
               }
               else if (isAuthRef.current) {
                    console.log("navigating...")
                    router.replace('/(authenticated)/(tabs)');
               }
               else {
                    router.replace('/');
               }
          }

          appState.current = nextAppState;
     };

     return children;
};