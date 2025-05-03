import { UserResDTOType } from "@/models/shared/shared-user.model";
import { createContext, useContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMe } from "@/queries/useMe";


const AppContext = createContext<{
     isAuth: boolean
     account: UserResDTOType;
     setAuth: (value: boolean) => void;
     setAccount: (value: UserResDTOType) => void;
}>({
     isAuth: false,
     setAuth: (value: boolean) => {},
     account: {} as UserResDTOType,
     setAccount: (value: UserResDTOType) => {},
});

export const useAppContext = () => {
     return useContext(AppContext);
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
     const [isAuth, setAuth] = useState(false);
     const [account, setAccount] = useState<UserResDTOType>({} as UserResDTOType);
          
     return (
          <AppContext.Provider value={{ isAuth: isAuth, setAuth: setAuth, account: account, setAccount: setAccount }}>
               {children}
          </AppContext.Provider>
     );
}