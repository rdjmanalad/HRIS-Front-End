import React, { useState } from "react";
import "../css/login.css";
import useLocalState from "./Hooks/useLocalState";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginApp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [jwt, setJwt] = useLocalState("jwt", "jwt");
  const [user, setUser] = useLocalState("user", "");

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

    fetch("http://localhost:8080/api/login", {
      // fetch("api/login", {
      headers: {
        "Content-Type": "application-json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        // alert(response.status);
        if (response.status === 200)
          return Promise.all([
            response.json(),
            //response.headers,
            response.data,
          ]);
        else return Promise.reject("Invalid Login Credentials");
      })

      .then(([data, headers, json]) => {
        console.log(data["accessToken"]);
        // alert(data["accessToken"]);
        setJwt(data["accessToken"]);
        window.sessionStorage.setItem("jwt", data["accessToken"]);
        // alert(localStorage.getItem("jwt"));
        setUser(username);
        navi("");
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
