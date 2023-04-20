import React, { useState, useRef } from "react";
import "../css/login.css";
import useLocalState from "./Hooks/useLocalState";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { waitFor, render } from "@testing-library/react";

const LoginApp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [jwt, setJwt] = useLocalState("jwt", "jwt");
  const [user, setUser] = useLocalState("user", "");
  const [userId, setUserId] = useLocalState("userId", "");
  const [userRole, setUserRole] = useLocalState("userRole", "");
  const baseURL = localStorage.getItem("baseURL");

  const navi = useNavigate();

  const myFunction = () => {
    console.log("pressed Enter ✅");
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      console.log("User pressed: ", event.key);

      if (event.key === "Enter") {
        event.preventDefault();
        senLoginRequest();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [username, password, senLoginRequest]);

  function senLoginRequest() {
    const reqBody = {
      username: username,
      password: password,
    };
    var jw = "";
    setUser(username);

    fetch(baseURL + "/api/login", {
      // fetch("api/login", {
      headers: {
        "Content-Type": "application-json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200) {
          return Promise.all([
            response.json(),
            //response.headers,
            response.data,
          ]);

          setUser(username);
        } else {
          return Promise.reject("Invalid Login Credentials");
        }
      })

      .then(([data, headers, json]) => {
        // console.log(data);
        setJwt(data["accessToken"]);
        window.sessionStorage.setItem("jwt", data["accessToken"]);
        setUser(username);
        jw = data["accessToken"].split(".")[1];
        setUserRole(JSON.parse(window.atob(jw)).roles);
        window.location.reload();
      })
      .catch((message) => {
        alert(message);
      });
  }

  return (
    <div className="div-form">
      <form className="loginForm">
        <h2>Please Login</h2>
        <div className="center">
          <input
            className="user"
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          ></input>
        </div>
        <div className="center">
          <input
            className="pass"
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
        </div>
        <div className="center">
          <input
            className="login-btn"
            type="button"
            value="Login"
            id="login"
            onClick={() => senLoginRequest()}
          ></input>
        </div>
        <br />
        <br />
        <div className="rfp">
          {/* <a href="registration.html">Forgot Password?</a> */}
        </div>
      </form>
    </div>
  );
};

export default LoginApp;
