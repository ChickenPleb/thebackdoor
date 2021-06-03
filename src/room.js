import React, { useState } from "react";
import Room1 from "./rooms/1/1.js";
import Room2 from "./rooms/2/2.js";
import page from "./page";

export default function Rooms() {
  const [show, setShow] = useState("block");

  function checkUrl() {
    if (page[0] === "to-room") {
      setShow("block");
      page[0] = "room";
    } else if (page[0] !== "room" && show !== "none") {
      setShow("none");
    }

    setTimeout(() => {
      checkUrl();
    }, 500);
  }
  checkUrl();
  return (
    <div style={{ display: show }}>
      <Room1 />
      <Room2 />
    </div>
  );
}
