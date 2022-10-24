import { ReactNode, useEffect, useState, createContext } from "react";

import { BaseApi } from "../services/API/ConfigApi";
import { SignIn as SignInApi } from "../services/API/SignIn";
import { SignUp as SignUpAPi } from "../services/API/SignUp";
import { getProfileApi } from "../services/API/getProfile";
import { changePassword as ChangePasswordApi } from "../services/API/ChangePassword";

import {
  userProps,
  userToLogin,
  userToSend,
  userProfileResponseProps,
} from "../@types";
import Cookies from "js-cookie";
import { bodyResponseType } from "../@types/API";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  isAuthenticated: boolean;
  user: userProps | null;
  profile: userProfileResponseProps | null;
  loading: boolean;
  SignIn(data: userToLogin): Promise<any>;
  SignOut(): void;
  SignUp(data: userToSend): Promise<void>;
  changePassword(data: {
    email: string;
    password: string;
  }): Promise<bodyResponseType>;
};
const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<userProps | null>(null);
  const [profile, setProfile] = useState<userProfileResponseProps | null>(null);
  const [isLoad, setIsLoad] = useState(false);

  function SignOut() {
    localStorage.removeItem("@lossless.Token");
    localStorage.removeItem("@lossless.Timelimt");
    localStorage.removeItem("@lossless.User");
    localStorage.removeItem("@lossless.Profile");
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
      const profile = localStorage.getItem("@lossless.Profile");

      if (!timeLimit || !token || !user || !profile) {
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
      const profileJSON = JSON.parse(profile);

      const challengesCompletedCookies = Number(
        Cookies.get(`challengeComplete.${userParsed.firstName}`)
      );
      const challengesCompleted = profileJSON.challengesCompleted;

      if (challengesCompletedCookies !== challengesCompleted) {
        getProfile();
      } else {
        setProfile(profileJSON);
      }
      setUser(userParsed);
      setIsLoad(false);
    })();
  }, []);

  async function SignIn({ email, password }: userToLogin) {
    try {
      const json = await SignInApi({ email, password });
      if (!json.success) return json
      const { token, user } = json.message;
      BaseApi.defaults.headers.common.Authorization = `Bearer ${token}`;
      await getProfile();

      localStorage.setItem("@lossless.User", JSON.stringify(user));
      localStorage.setItem("@lossless.Token", token);
      const oneDayTime = 1000 * 60 * 60 * 24;
      const now = new Date();
      const time = new Date(now.getTime() + oneDayTime);
      localStorage.setItem("@lossless.Timelimt", time.toISOString());
      setUser(user);
      setIsLoad(false);
    } catch (error) {
      setIsLoad(false);
    }

    const url = window.location.href;
    if (url.includes("/signup")) {
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

  async function getProfile() {
    setIsLoad(true);
    const response = await getProfileApi();
    if (!response.success) return Promise.reject(response.message);
    const profile = response.message as userProfileResponseProps;

    localStorage.setItem("@lossless.Profile", JSON.stringify(profile));
    setProfile(profile);
    setIsLoad(false);
  }

  async function changePassword(data: {
    email: string;
    password: string;
  }) {
    return ChangePasswordApi(data.email, data.password);
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        SignIn,
        SignOut,
        SignUp,
        profile,
        user,
        loading: isLoad,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
