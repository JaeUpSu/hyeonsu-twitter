import React, { useState } from "react";
import styles from "./Auth.module.css";

function Auth() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeUser = (e) => {
    const { name, value } = e.target;

    console.log(name + " " + value);
    setUser({
      ...user,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault(); // submit 버튼 클릭 시 새로고침 방지
    console.log(user.email + " " + user.password);
  };

  return (
    <div className={styles.auth_body}>
      <form onSubmit={onSubmit}>
        <div>
          <input
            name="email"
            type="email"
            placeholder="input email"
            value={user.email}
            onChange={onChangeUser}
            required
          ></input>
        </div>
        <div>
          <input
            name="password"
            type="passowrd"
            placeholder="input password"
            value={user.password}
            onChange={onChangeUser}
            required
          ></input>
        </div>
        <div>
          <input type="submit" value="sign in"></input>
        </div>
      </form>
    </div>
  );
}

export default Auth;
