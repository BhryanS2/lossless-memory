import { FormEvent, useState } from "react";
import { challengeProps } from "../@types";
import styles from "../styles/components/ChallengeForm.module.css";

type ChallengeFormProps = {
  closeModal: () => void;
  submit: (data: any) => Promise<void>;
  data?: challengeProps;
};

export function ChallengeForm({
  closeModal,
  submit,
  data,
}: ChallengeFormProps) {
  const [amount, setAmount] = useState(data?.amount || 0);
  const [description, setDescription] = useState(data?.description || "");
  const [type, setType] = useState(data?.type || "body");
  const id = data?.id;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    submit({ amount, description, type, id });
    closeModal();
  }

  return (
    <div className={styles.modalContainer}>
      <form onSubmit={handleSubmit} className={styles.formModal}>
        <h2>
          {data?.id ? `Editando o desafio ${data.id}` : "Criando um novo desafio"}
        </h2>
        <div className={styles.selectContainer}>
          <select
            name="type"
            id="type"
            value={type}
            onChange={(event) => {
              setType(event.target.value);
            }}
            className={styles.select}
            required
          >
            <option value="body">Body</option>
            <option value="eye">Eye</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="amount"
            id="amount"
            value={amount}
            onChange={(event) => {
              const { value } = event.target;
              const numbers = value.replace(/\D/g, "");
              setAmount(Number(numbers));
            }}
            placeholder="Quantidade de experiência"
            className={styles.input}
            required
            min={1}

          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            placeholder="Descrição"
            className={styles.input}
            required
          />
        </div>
        <button type="submit" className={`${styles.btn} ${styles.submit}`}>Submit</button>
        <div className={`${styles.floatButton}`} >
          <button onClick={closeModal} className={styles.btn}>
            &times;
          </button>
        </div>
      </form>
    </div>
  );
}
