import "./logInForm.scss";
import userInfo from "./userInfo";
import page from "./page";
import React, { useState } from "react";
import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyB8vGX3QbxahZ8euQviNLTHTB8gPVxFM6k",
  authDomain: "react-thebackdoor.firebaseapp.com",
  projectId: "react-thebackdoor",
  storageBucket: "react-thebackdoor.appspot.com",
  messagingSenderId: "920210020669",
  appId: "1:920210020669:web:02fb6f59678cd055644d54",
  measurementId: "G-4G45L5S9JR"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
firebase.analytics();

async function getUserData(data) {
  const doc = await data.get();
  return doc.data();
}

export default function Login() {
  const db = firebase.firestore();
  const users = db.collection("users");

  const [incorrect, setIncorrect] = useState("username does not exist");
  const [show, setShow] = useState("none");

  function checkUrl() {
    if (page[0] === "to-login") {
      setShow("block");
      page[0] = "login";
    } else if (page[0] !== "login" && show !== "none") {
      setShow("none");
    }
    setTimeout(() => {
      checkUrl();
    }, 500);
  }
  checkUrl();

  function startHome(userName, password, teacher) {
    setErrorOpacity("0");
    setErrorMargin("-2.5px");
    page[0] = "to-home";
    userInfo[0][0] = userName;
    userInfo[0][1] = password;
    userInfo[0][2] = teacher;
  }

  function initializeUserData(userName, password, teacher) {
    getUserData(users.doc(userName)).then((result) => {
      if (result === undefined) {
        if (signInState === "activeSign") {
          setErrorOpacity("1");
          setErrorMargin("8px");
          setIncorrect("username does not exist");
        } else {
          if (userName !== "" && password !== "" && teacher !== "") {
            if (
              teacher !== "yael_tal" &&
              teacher !== "yael tal" &&
              teacher !== "Yael Tal" &&
              teacher !== "Yael_Tal"
            ) {
              setErrorOpacity("1");
              setErrorMargin("8px");
              setIncorrect("teacher does not exist");
            } else {
              startHome(userName, password, teacher);
              db.collection("users").doc(userName).set({
                password: password,
                teacher: teacher
              });
            }
          }
        }
      } else {
        if (signInState === "activeSign") {
          if (
            result["password"] === password &&
            result["teacher"] === teacher
          ) {
            if (userName !== "" && password !== "" && teacher !== "") {
              startHome(userName, password, teacher);
            }
          } else {
            setErrorOpacity("1");
            setErrorMargin("8px");
            setIncorrect("password/teacher do not match");
          }
        } else {
          setErrorOpacity("1");
          setErrorMargin("8px");
          setIncorrect("user already exists");
        }
      }
    });
  }

  const [signInState, setSignInState] = useState("activeSign");
  const [signUpState, setSignUpState] = useState("sign");

  const [eOpacity, setErrorOpacity] = useState("0");
  const [eMargin, setErrorMargin] = useState("-2.5px");

  function signIn() {
    setSignInState("activeSign");
    setSignUpState("sign");
  }
  function signUp() {
    setSignInState("sign");
    setSignUpState("activeSign");
  }

  return (
    <div style={{ display: show }}>
      <div className="signInForm">
        <div className="flexLogIn">
          <h1
            className={signInState}
            onClick={() => {
              if (signInState === "sign") {
                document.getElementById("Teacher").value = "";
                document.getElementById("Password").value = "";
                document.getElementById("username").value = "";
              }
              signIn();
            }}
          >
            Sign In
          </h1>
          <h2
            className={signUpState}
            onClick={() => {
              if (signUpState === "sign") {
                document.getElementById("Teacher").value = "";
                document.getElementById("Password").value = "";
                document.getElementById("username").value = "";
              }
              signUp();
            }}
          >
            Sign Up
          </h2>
        </div>

        <input
          id="username"
          className="logInput"
          placeholder="Username"
        ></input>
        <br />
        <input
          id="Password"
          className="logInput"
          placeholder="Password"
        ></input>
        <br />
        <input id="Teacher" className="logInput" placeholder="Teacher"></input>
        <br />
        <h3 className="error" style={{ opacity: eOpacity, marginTop: eMargin }}>
          {incorrect}
        </h3>

        <div
          className="submitButton"
          onClick={() => {
            if (document.getElementById("username").value !== "") {
              initializeUserData(
                document.getElementById("username").value,
                document.getElementById("Password").value,
                document.getElementById("Teacher").value
              );
            }
          }}
        >
          <img
            src="https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/checkmark-24-512.png"
            alt="submitImage"
            className="submitImage"
          />
        </div>
      </div>
    </div>
  );
}
