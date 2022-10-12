import { ReactNode, createContext, useState, useEffect } from "react";

import { CreateChallege } from "../services/API/challenges/create";
import { EditChallege } from "../services/API/challenges/edit";
import { DeleteChallege } from "../services/API/challenges/delete";
import { GetChallege } from "../services/API/challenges/get";

import { challengeProps } from "../@types";
import { useAuth } from "../hooks/useAuth";

type AdminProviderProps = {
  children: ReactNode;
};

type adminContextData = {
  editChallenge: (data: challengeProps) => Promise<void>;
  deleteChallenge: (id: string) => Promise<void>;
  createChallenge: (data: Omit<challengeProps, "id">) => Promise<void>;
  challenges: challengeProps[];
  isAdmin: boolean;
};
export const AdminContext = createContext({} as adminContextData);

export function AdminContextProvider({ children }: AdminProviderProps) {
  const [challenges, setChallenges] = useState<challengeProps[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useAuth();

  async function editChallenge(data: challengeProps) {
    try {
      const response = await EditChallege(data);
      if (response) {
        setChallenges((challenges) =>
          challenges.map((challenge) =>
            challenge.id === data.id ? data : challenge
          )
        );
      }
    } catch (error) {}
  }

  async function deleteChallenge(id: string) {
    try {
      const response = await DeleteChallege(id);
      if (response) {
        setChallenges((challenges) =>
          challenges.filter((challenge) => challenge.id !== Number(id))
        );
      }
    } catch (error) {}
  }

  async function getChallenges() {
    try {
      const response = await GetChallege();
      if (response) {
        setChallenges(response.message);
      }
    } catch (error) {}
  }

  async function createChallenge(data: Omit<challengeProps, "id">) {
    try {
      const response = await CreateChallege(data);
      if (response) {
        setChallenges((challenges) => [...challenges, response.message]);
      }
    } catch (error) {}
  }

  useEffect(() => {
    (async () => {
      await getChallenges();
    })();
  }, []);

  useEffect(() => {
    if (user) {
      setIsAdmin(user.email === process.env.REACT_APP_ADMIN_EMAIL);
    }
  }, [user]);
  return (
    <AdminContext.Provider
      value={{
        challenges,
        editChallenge,
        deleteChallenge,
        createChallenge,
        isAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export default AdminContextProvider;
