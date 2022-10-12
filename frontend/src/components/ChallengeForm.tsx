import { FormEvent, useState } from "react";
import { challengeProps } from "../@types";

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
    <form onSubmit={handleSubmit}>
      <h2>
        {data?.id ? `Editando o desafio ${data.id}` : "Criando um novo desafio"}
      </h2>
      <div>
        <select
          name="type"
          id="type"
          value={type}
          onChange={(event) => {
            setType(event.target.value);
          }}
        >
          <option value="body">Body</option>
          <option value="eye">Eye</option>
        </select>
      </div>
      <div>
        <input
          type="number"
          name="amount"
          id="amount"
          value={amount}
          onChange={(event) => {
            setAmount(Number(event.target.value));
          }}
        />
      </div>
      <div>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
