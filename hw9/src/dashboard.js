import React, { useState } from "react";
function DashboardPage({ clientInfo }) {
  const [curClientInfo, setCurCleintInfo] = useState(clientInfo);
  console.log(curClientInfo);
  return <div>Dashboard</div>;
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
