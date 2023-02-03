import React, { useState } from "react";
import styles from "./Auth.module.css";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "fbase";

function Auth() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [newAccount, setNewAccount] = useState(false);
  const [userData, setUserData] = useState(null);

  const onChangeUser = (e) => {
    const { name, value } = e.target;

    console.log(name + " " + value);
    setUser({
      ...user,
      [name]: value,
    });
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  function handleGoogleLogin() {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((data) => {
        setUserData(data.user);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onSubmit = async (event) => {
    event.preventDefault(); // submit 버튼 클릭 시 새로고침 방지
    console.log(user.email + " " + user.password);

    const auth = getAuth(app);
    let auth_data;

    if (newAccount) {
      auth_data = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      console.log("가입");
    } else {
      auth_data = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      console.log("로그인");
    }

    console.log(auth_data);
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
            type="password"
            placeholder="input password"
            value={user.password}
            onChange={onChangeUser}
            required
          ></input>
        </div>
        <div>
          <input
            type="submit"
            value={newAccount ? "Create Account" : "Sign in"}
          ></input>
          <span onClick={toggleAccount}>
            {newAccount ? " Sign in" : " Create Account"}
          </span>
          <br />
          <br />
          <button onClick={handleGoogleLogin}>Google Account</button>
          {userData ? userData.displayName : null}
        </div>
      </form>
    </div>
  );
}

export default Auth;
