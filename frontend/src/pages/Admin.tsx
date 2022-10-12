import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { challengeProps } from "../@types";
import { ChallengeForm } from "../components/ChallengeForm";
import { Navbar } from "../components/navbar";
import { useAdmin } from "../hooks/useAdmin";
import { useAuth } from "../hooks/useAuth";

import styles from "../styles/pages/Admin.module.css";

export function Admin() {
  const {
    isAdmin,
    challenges,
    deleteChallenge,
    createChallenge,
    editChallenge,
  } = useAdmin();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<challengeProps | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  if (!isAdmin) {
    navigate("/");
  }

  if (user?.email !== process.env.REACT_APP_ADMIN_EMAIL) {
    navigate("/");
  }

  function handleDeleteChallenge(id: number) {
    deleteChallenge(String(id));
  }

  function handleEditModal(editData: challengeProps) {
    setIsModalOpen(true);
    setIsEditing(true);
    setData(editData);
  }

  function closeModal() {
    setIsModalOpen(false);
    setData(undefined);
  }

  function openCreateForm() {
    setIsModalOpen(true);
    setIsEditing(false);
    setData(undefined);
  }

  return (
    <Navbar toPath="/admin">
      <main className={styles.container}>
        {isModalOpen && (
          <ChallengeForm
            closeModal={closeModal}
            submit={isEditing ? editChallenge : createChallenge}
            data={data}
          />
        )}
        <h1>Admin</h1>
        <section>
          <div className={styles.challengeTitle}>
            <h2>Challenges</h2>
            <button onClick={openCreateForm}>Create</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Type</th>
                <th>Experience</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {challenges.map((challenge) => (
                <tr key={challenge.id}>
                  <td>{challenge.id}</td>
                  <td>{challenge.type}</td>
                  <td>{challenge.amount}</td>
                  <td>{challenge.description}</td>
                  <td>
                    <button onClick={() => handleEditModal(challenge)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteChallenge(challenge.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </Navbar>
  );
}
