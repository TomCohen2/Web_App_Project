import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import Button from "@mui/material/Button";
import axios from "axios";

import Alert from "@mui/material/Alert";

function SignIn(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("123456");
  const [userData, setUserData] = useState({
    username: "",
    password: password,
  });
  const [isChangePass, setIsChangePass] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(userData);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submitted" + userData.username + userData.password);
    console.log(localStorage.getItem("isAuthenticated"));
    if (userData.username === "" || userData.password === "") {
      setErrorMessage((prevState) => ({
        value: "Empty username/password field",
      }));
    } else if (
      userData.username.toLowerCase() === "admin" &&
      userData.password === password
    ) {
      //Signin Success
      localStorage.setItem("isAuthenticated", true);
      window.location.pathname = "/screen=0";
      console.log(localStorage.getItem("isAuthenticated") + "SIGNIN PAGE");
      navigate("/screen=0");
    } else {
      //If credentials entered is invalid
      setErrorMessage((prevState) => ({ value: "Invalid username/password" }));
      return;
    }
  }

  function handleChangeAdminPass(e) {
    console.log("Password changed to: " + userData.password);
    setPassword(userData.password);
    setIsChangePass(false);

    axios
      .put(`http://localhost:8000/password/620a39d44ecf20c8fc3fbbe4`, password)
      .then((res) => {
        console.log(res);
        setPassword({ password: password });
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log("Error couldn't create TODO");
        console.log(err.message);
      });
  }

  function handleChangePassword() {
    if (userData.username === "" || userData.password === "") {
      setErrorMessage((prevState) => ({
        value: "Empty username/password field",
      }));
      alert(errorMessage.value);
      console.log(errorMessage.value);
    } else if (
      userData.username.toLowerCase() === "admin" &&
      userData.password === password
    ) {
      //Signin Success
      localStorage.setItem("isAuthenticated", true);
      // console.log(localStorage.getItem("isAuthenticated") + "SIGNIN PAGE");
      setIsChangePass(!isChangePass);
    } else {
      //If credentials entered is invalid
      setErrorMessage((prevState) => ({ value: "Invalid username/password" }));
      alert(errorMessage.value);
      return;
    }
  }
  return (
    <>
      {!isChangePass && (
        <div className="page__signin">
          <form className="form__signin">
            <Button onClick={handleChangePassword}>Change Password</Button>
            <h1>Sign-In</h1>
            <input
              name="username"
              placeholder="username"
              onChange={handleChange}
            ></input>
            <input
              name="password"
              placeholder="password"
              onChange={handleChange}
            ></input>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </form>
        </div>
      )}

      {isChangePass && (
        <div className="page__signin">
          <div className="page__signin">
            <form className="form__signin">
              {/* <Button onClick={handleChangePassword}>Change Password</Button> */}
              <h1>Change Admin Password</h1>
              <input
                name="username"
                value="admin"
                disabled={true}
                onChange={handleChange}
              ></input>
              <input
                name="password"
                placeholder="new password"
                onChange={handleChange}
              ></input>
              <Button variant="contained" onClick={handleChangeAdminPass}>
                Change
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default SignIn;
