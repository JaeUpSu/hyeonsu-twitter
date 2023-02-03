import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import app from "fbase";
import AppRouter from "./Router";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, seteUserObj] = useState(null);

  const initializeUser = () => {
    const auth = getAuth(app);
    auth.onAuthStateChanged((user) => {
      console.log("user");
      console.log(user);

      if (user) {
        setIsLoggedIn(true);
        seteUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  };

  useEffect(() => {
    initializeUser();
  }, []);

  return (
    <div>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "Initializing..." //로딩중
      )}
    </div>
  );
}

export default App;
