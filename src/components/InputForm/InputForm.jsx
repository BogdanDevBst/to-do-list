import React from "react";
import styles from "./InputForm.module.scss";

const InputForm = props => {
  const { type, placeholder, handleInput } = props;
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        onChange={event => handleInput(event.target.value)}
      />
    </>
  );
};

export default InputForm;
