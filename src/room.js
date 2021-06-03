import React, { useState } from "react";
import Room1 from "./rooms/1/1.js";
import Room2 from "./rooms/2/2.js";
import page from "./page";
import currentRoom from "./currentRoom.js";

export default function Rooms() {
  const [show, setShow] = useState("block");
  var roomArray = ["none", "none"];
  const [rooms, setRooms] = useState(roomArray);

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

  setTimeout(() => {
    roomArray[parseInt(currentRoom[0], 10) - 1] = "block";
    setRooms(roomArray);
  }, 100);

  return (
    <div style={{ display: show }}>
      <div style={{ display: rooms[0] }}>
        <Room1 />
      </div>

      <div style={{ display: rooms[1] }}>
        <Room2 />
      </div>
    </div>
  );
}
