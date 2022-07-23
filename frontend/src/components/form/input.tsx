import { useEffect, useRef, InputHTMLAttributes } from "react";
import { useField } from "@unform/core";

import styles from "../../styles/components/form/Input.module.css";

type inputDataType = InputHTMLAttributes<HTMLInputElement> & {
  datavalue: string;
  name: string;
};

interface inputCpfProps extends inputDataType {
  InputMaskChange: (value: string) => void;
}

export function Input(data: inputDataType) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { registerField, fieldName } = useField(data.name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <div className={styles.container}>
      <input ref={inputRef} {...data} />

      <label htmlFor={data.name}>{data.datavalue}</label>
    </div>
  );
}

function maskCPF(value: string) {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 6) {
    const numbersMask = numbers.replace(/^(\d{3})(\d)/, "$1.$2");
    return numbersMask;
  }

  if (numbers.length < 10) {
    const numbersMask = numbers.replace(/^(\d{3})(\d{3})(\d)/, "$1.$2.$3");
    return numbersMask;
  }

  const numbersMask = numbers.replace(
    /^(\d{3})(\d{3})(\d{3})(\d)/,
    "$1.$2.$3-$4"
  );
  return numbersMask;
}

export function InputCpf({
  InputMaskChange,
  name,
  datavalue,
  ...rest
}: inputCpfProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { registerField, fieldName } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  function handleTextChange(text: string) {
    InputMaskChange(maskCPF(text));
  }

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        {...rest}
        onChange={(event) => handleTextChange(event.currentTarget.value)}
      />

      <label htmlFor={name}>{datavalue}</label>
    </div>
  );
}
