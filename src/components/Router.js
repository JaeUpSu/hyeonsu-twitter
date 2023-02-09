import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./Navigation";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      <div>
        {isLoggedIn && <Navigation />}
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home userObj={userObj} />} />
              <Route path="/profile" element={<Profile />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Auth />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};
export default AppRouter;
