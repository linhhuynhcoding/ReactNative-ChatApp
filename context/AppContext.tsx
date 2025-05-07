import { UserResDTOType } from "@/models/shared/shared-user.model";
import { createContext, useContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMe } from "@/queries/useUser";
import { Socket } from "socket.io-client";
import { SocketService } from "@/services/socket.service";


const AppContext = createContext<{
     isAuth: boolean
     account: UserResDTOType;
     socket: SocketService | null;
     setSocket: (socket: SocketService | null) => void;
     setAuth: (value: boolean) => void;
     setAccount: (value: UserResDTOType) => void;
}>({
     isAuth: false,
     setAuth: (value: boolean) => { },
     account: {} as UserResDTOType,
     setAccount: (value: UserResDTOType) => { },
     socket: null,
     setSocket: (socket: SocketService | null) => { },
});

export const useAppContext = () => {
     return useContext(AppContext);
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
     const [isAuth, setAuth] = useState(false);
     const [account, setAccount] = useState<UserResDTOType>({} as UserResDTOType);
     const [socket, setSocket] = useState<SocketService | null>(null);

     return (
          <AppContext.Provider value={{ 
               isAuth: isAuth, setAuth: (value: boolean) => setAuth(value), 
               account: account, setAccount: (value: UserResDTOType) => setAccount(value), 
               socket: socket, setSocket: (value: SocketService | null) => setSocket(value) }}>
               {children}
          </AppContext.Provider>
     );
}