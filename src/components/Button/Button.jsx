import React from "react";
import styles from "./Button.module.scss";

const Button = props => {
  const btnStyles = props.isPrimary ? styles.primary : styles.secondary;

  return (
    <>
      <button
        className={`${styles.btn} ${btnStyles}`}
        onClick={props.handleClick}
      >
        {props.text}
      </button>
    </>
  );
};

export default Button;
