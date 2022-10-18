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
            <button
              onClick={openCreateForm}
              className={`${styles.btn} ${styles.createButton}`}
            >Create</button>
          </div>
          <section className={styles.challengeTable}>
            <div className={styles.challengeTableHead}>
              <p>ID</p>
              <p>Type</p>
              <p>Experience</p>
              <p>Description</p>
              <p>Actions</p>
            </div>
            <div className={styles.challengeTableBody}>
              {challenges.map((challenge) => (
                <div key={challenge.id} className={styles.challengeTableRow}>
                  <p>{challenge.id}</p>
                  <p>{challenge.type}</p>
                  <p>{challenge.amount}</p>
                  <p>{challenge.description}</p>
                  <div className={styles.challengeTableActions}>
                    <button onClick={() => handleEditModal(challenge)} className={styles.btn}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteChallenge(challenge.id)} className={`${styles.btn} ${styles.delete}`}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>
      </main>
    </Navbar>
  );
}
