import { ReactNode, useEffect, useState, createContext } from "react";
import { userProps, userToLogin, userToSend } from "../@types";
import { BaseApi } from "../services/API/ConfigApi";
// import and rename methods from BaseApi
import { SignIn as SignInApi } from "../services/API/SignIn";
import { SignUp as SignUpAPi } from "../services/API/SignUp";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  isAuthenticated: boolean;
  user: userProps | null;
  loading: boolean;
  SignIn(data: userToLogin): Promise<void>;
  SignOut(): void;
  SignUp(data: userToSend): Promise<void>;
};
const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<userProps | null>(null);
  const [isLoad, setIsLoad] = useState(true);

  function SignOut() {
    localStorage.removeItem("@lossless.Token");
    localStorage.removeItem("@lossless.Timelimt");
    localStorage.removeItem("@lossless.User");
    setUser(null);
    if (
      window.location.pathname !== "/" &&
      window.location.pathname !== "/signup"
    ) {
      window.location.href = "/";
    }
  }

  useEffect(() => {
    (async () => {
      const timeLimit = localStorage.getItem("@lossless.Timelimt");
      const user = localStorage.getItem("@lossless.User");
      const token = localStorage.getItem("@lossless.Token");

      if (!timeLimit || !token || !user) {
        SignOut();
        return;
      }

      const now = new Date();
      const time = new Date(timeLimit);
      if (now.getTime() > time.getTime()) {
        SignOut();
        return;
      }
      BaseApi.defaults.headers.common.Authorization = `Bearer ${token}`;
      const userParsed = JSON.parse(user);
      setUser(userParsed);
      setIsLoad(false);
    })();
  }, []);

  async function SignIn({ email, password }: userToLogin) {
    setIsLoad(true);
    const json = await SignInApi({ email, password });
    if (!json.success) return Promise.reject(json.message);
    const { token, user } = json.message;
    BaseApi.defaults.headers.common.Authorization = `Bearer ${token}`;

    localStorage.setItem("@lossless.User", JSON.stringify(user));
    localStorage.setItem("@lossless.Token", token);
    const oneDayTime = 1000 * 60 * 60 * 24;
    const now = new Date();
    const time = new Date(now.getTime() + oneDayTime);
    localStorage.setItem("@lossless.Timelimt", time.toISOString());
    setUser(user);
    setIsLoad(false);
    const url = window.location.href;
    if (url.includes("/login") || url.includes("/signup")) {
      window.history.replaceState({}, "", "/");
      window.location.reload();
    }
  }

  async function SignUp(data: userToSend): Promise<void> {
    setIsLoad(true);
    const reponse = await SignUpAPi(data);

    if (!reponse.success) return Promise.reject(reponse.message);

    const { email, password } = data;
    await SignIn({ email, password });
    setIsLoad(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        SignIn,
        SignOut,
        SignUp,
        user,
        loading: isLoad,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
