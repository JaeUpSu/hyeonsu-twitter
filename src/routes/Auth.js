import React from "react";
import styles from "./Auth.module.css";

function Auth() {
  return (
    <div className={styles.auth_body}>
      <ul className={styles.auth_box}>
        <li>
          <span>ID : </span>
          <input></input>
        </li>{" "}
        <li>
          <span>PASSWORD : </span>
          <input></input>
        </li>
        <li>
          <span>PASSWORD-CHECK : </span>
          <input></input>
        </li>
        <br></br>
        <li>
          <span>NAME : </span>
          <input></input>
        </li>
        <li>
          <span>AGE : </span>
          <input></input>
        </li>
      </ul>
    </div>
  );
}

export default Auth;
