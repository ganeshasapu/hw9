import React, { useState } from "react";
import { useLocation } from "react-router";
import Sidebar from "./sidebar";
import Grid from "./grid";
function DashboardPage({ props }) {
  const { state } = useLocation();
  console.log(state);
  const [curClientInfo, setCurClientInfo] = useState(props);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ justifyContent: "center" }}>
        <Grid />
      </div>
    </div>
  );
}

export default DashboardPage;

/*

  const addRoom = async (e) => {
    e.preventDefault();
    let data = {
      message: messageRef.current.value,
    };

    try {
      addDoc(rooms, data);
    } catch (e) {
      console.log(e);
    }
  };

<input type="text" ref={messageRef} />
      <button
        type="submit"
        onClick={(e) => {
          addRoom(e);
          navigateToDashboard();
        }}
      >
        Save
      </button>
      <div>Home</div>
*/
