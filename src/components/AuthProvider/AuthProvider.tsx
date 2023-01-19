import { createContext, ReactNode, useContext, useState } from "react";

const AuthContext = createContext({
  loggedIn: false,
  setLoggedIn: (val: boolean) => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default AuthProvider;
export { useAuth };
