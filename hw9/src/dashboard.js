import React, { useState } from "react";
import { useLocation } from "react-router";
import Sidebar from "./sidebar";
import Grid from "./grid";
import { getDocs } from "@firebase/firestore";
import { firestore } from "./initialize";
import { useEffect } from "react";
import { collection } from "@firebase/firestore";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router";

function DashboardPage({ props }) {
  const { state } = useLocation();

  const [userRooms, setUserRooms] = useState(null);
  console.log(state.test.uid);

  const roomsCollectionsRef = collection(firestore, "rooms");

  useEffect(() => {
    const getRooms = async () => {
      const data = await getDocs(roomsCollectionsRef);
      var rooms = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      let curUserRooms = [];
      for (let room in rooms) {
        if (rooms[room].userIds == state.test.uid) {
          curUserRooms.push(rooms[room]);
        }
      }
      setUserRooms(curUserRooms);
    };

    getRooms();
  }, []);

  const navigate = useNavigate();

  function navigateToRoom(roomId) {
    navigate("/roomDisplay", { state: { test: state.test, roomId: roomId } });
  }
  const navigateToJoin = () => {
    navigate("/join", { state: { test: state.test } });
  };
  const navigateToTask = () => {
    navigate("/task", { state: { test: state.test } });
  };

  const navigation = [
    { name: "Dashboard", func: "#", current: true },
    { name: "Create Group", func: navigateToTask, current: false },
    { name: "Join Group", func: navigateToJoin, current: false },
    { name: "Profile Settings", func: "#", current: false },
    { name: "Refer To Others", func: "#", current: false },
    { name: "Logout", func: "#", current: false },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "20vw" }}>
        <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center space-y-5 px-4">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
          </div>
          <div className="mt-5 flex flex-grow flex-col">
            <nav className="flex-1 space-y-1 bg-white" aria-label="Sidebar">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    item.func();
                  }}
                  className={classNames(
                    item.current
                      ? "bg-indigo-50 border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group flex items-center px-3 py-2 text-sm font-medium border-l-4"
                  )}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div>
        <div style={{ padding: "15px" }}>
          <h2 className="text-xl font-medium text-gray-900">Rooms</h2>
          <ul
            role="list"
            className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
          >
            {userRooms
              ? userRooms.map((room, i) => (
                  <button
                    key={room.ownerId}
                    className="m-4 col-span-1 flex rounded-md shadow-sm"
                    onClick={() => {
                      navigateToRoom(room.id);
                    }}
                  >
                    <div className="flex flex-1 items-center justify-between truncate rounded-md border border-gray-200 bg-white">
                      <div className="flex-1 truncate px-4 py-2 text-sm">
                        <a className="font-medium text-gray-900 hover:text-gray-600">
                          {`Room ${i + 1}`}
                        </a>
                        <p className="text-gray-500">{room.id}</p>
                      </div>
                      <div className="flex-shrink-0 pr-2">
                        <button
                          type="button"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <span className="sr-only">Open options</span>
                          <EllipsisVerticalIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                  </button>
                ))
              : ""}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
