import { createContext, useContext, useState } from "react";
import { boolean } from "zod";

const AppContext = createContext<{
     isAuth: boolean
     setAuth: (value: boolean) => void;
}>({
     isAuth: false,
     setAuth: (value: boolean) => {}
});

export const useAppContext = () => {
     return useContext(AppContext);
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
     const [isAuth, setAuth] = useState(true);

     return (
          <AppContext.Provider value={{ isAuth: isAuth, setAuth: setAuth }}>
               {children}
          </AppContext.Provider>
     );
}