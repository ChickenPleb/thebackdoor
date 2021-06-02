import React, { useState } from "react";
import page from "./page";
import userInfo from "./userInfo";
import "./home.scss";

export default function Home() {
  const [show, setShow] = useState("none");
  function checkUrl() {
    if (page[0] === "to-home") {
      setShow("block");
      page[0] = "home";
    } else if (page[0] !== "home" && show !== "none") {
      setShow("none");
    }

    setTimeout(() => {
      checkUrl();
    }, 500);
  }
  checkUrl();

  return (
    <div style={{ display: show }}>
      <div className="header">
        <img
          src="https://images-platform.99static.com//f2sZeDTWz0zmbhEKgE20Z5iXLk8=/321x792:1166x1637/fit-in/500x500/99designs-contests-attachments/89/89914/attachment_89914782"
          alt="appLogo"
          className="appLogo"
        />
        <h1 className="userTitle"> {userInfo[0][0]} </h1>
      </div>

      <h1 className="homeTitle">The Backdoor</h1>

      <div className="levels">
        <h3 className="levelsTitle">Levels: </h3>
        <div className="levelButtons">
          <h4 className="level-active">1</h4>
          <h4 className="level">2</h4>
          <h4 className="level">3</h4>
          <h4 className="level">4</h4>
          <h4 className="level">5</h4>
        </div>
      </div>

      <div className="rooms">
        <div className="room">1</div>
        <div className="room">2</div>
        <div className="room">3</div>
        <div className="room">4</div>
        <div className="room">5</div>
      </div>
    </div>
  );
}
