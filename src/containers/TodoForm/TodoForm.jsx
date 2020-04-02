import React from "react";
import styles from "./TodoForm.module.scss";
import InputForm from "../../components/InputForm";
import Button from "../../components/Button";

const TodoForm = props => {
  const { description, startDate, endDate, image, btnSubmit } = props;

  return (
    <>
      <InputForm type="text" placeholder="Todo..." handleInput={description} />
      <InputForm
        type="date"
        placeholder="Start date..."
        handleInput={startDate}
      />
      <InputForm type="date" placeholder="End date..." handleInput={endDate} />
      <InputForm type="url" placeholder="Image URL..." handleInput={image} />
      <Button text="Add" isPrimary={true} handleClick={btnSubmit} />
    </>
  );
};

export default TodoForm;
