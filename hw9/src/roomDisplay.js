import { useState } from "react";
import { collection } from "@firebase/firestore";
import { firestore } from "./initialize";
import { useEffect } from "react";
import { getDocs } from "@firebase/firestore";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import moment from "moment";
import v1 from "./assets/v1.svg";
import v2 from "./assets/v2.svg";
import EllipseInner from "./assets/ellipse_inner.svg";
import Logo from "./assets/logo.svg";
import Keep from "./assets/Group 1.svg";
import Up from "./assets/Group 2.svg";

export default function RoomDisplay({}) {
  const [allUsers, setAllUsers] = useState([]);
  const [roomInfo, setRoomInfo] = useState({});
  const [roomUsers, setRoomUsers] = useState([]);
  const [pointData, setPointData] = useState([]);
  const date = moment();
  const [curDay, setCurDay] = useState(date);

  const { state } = useLocation();

  const roomCollectionRef = collection(firestore, "rooms");
  const usersCollectionRef = collection(firestore, "users");

  const navigate = useNavigate();

  function navigateToDash() {
    navigate("/dashboard", { state: { test: state.test } });
  }

  let roomID = "6f2iBYYI7xMJqE96YpDa";

  useEffect(() => {
    var rooms = [];
    const getRoomID = async () => {
      const data = await getDocs(roomCollectionRef);
      rooms = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      for (let allRoomID in rooms) {
        if (rooms[allRoomID].id == roomID) {
          setPointData(rooms[allRoomID].scores);
          setRoomInfo(rooms[allRoomID]);
        }
      }
    };

    const getUsers = async () => {
      var allUsers = [];
      const data = await getDocs(usersCollectionRef);
      allUsers = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAllUsers(allUsers);
    };
    getUsers();
    getRoomID();
  }, []);

  if (allUsers.length != 0 && roomInfo.length != 0 && roomUsers.length == 0) {
    var currentRoomUsers = [];
    for (let user in allUsers) {
      if (roomInfo.userIds.includes(allUsers[user].uid)) {
        let person = allUsers[user];
        let personData = {
          name: person.name,
          uid: person.uid,
          email: person.email,
          image:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        };
        if (!currentRoomUsers.includes(personData)) {
          currentRoomUsers.push(personData);
        } else {
        }
      }
    }
    setRoomUsers(currentRoomUsers);
  }

  return (
    <div style={{ width: "100vw", height: "100vh", overflowY: "hidden" }}>
      <img
        src={v1}
        style={{
          position: "absolute",
          left: "50vw",
          top: "70vh",
          zIndex: "-1",
        }}
      />
      <img
        src={v2}
        style={{
          position: "absolute",
          left: "0vw",
          top: "20vh",
          zIndex: "-1",
        }}
      />

      <div className="px-4 sm:px-6 lg:px-8" style={{ overflow: "hidden" }}>
        {/* {console.log(pointData)}
      {console.log(pointData[curDay.format("DD/MM/YY")])}
      {console.log(Object.keys(pointData[curDay.format("DD/MM/YY")]))} */}
        <div style={{ height: "3vh" }} />
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <button
              onClick={() => {
                navigateToDash();
              }}
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={5}
                stroke="currentColor"
                className="w-5 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
              <span class="sr-only">Icon description</span>
            </button>
            <div style={{ height: "5vh" }} />
            <div style={{ display: "flex" }}>
              <button
                type="button"
                class="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-6 mb-2"
                onClick={() => {
                  setCurDay(moment(curDay).subtract(1, "days"));
                }}
              >
                {"<"}
              </button>
              <h1
                className="text-4xl font-bold text-gray-900"
                style={{ marginLeft: "-5px", paddingRight: "15px" }}
              >
                {curDay.format("MMM Do YYYY")}
              </h1>
              <div style={{ height: "5vh" }} />
              <button
                type="button"
                class="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2"
                onClick={() => {
                  setCurDay(moment(curDay).add(1, "days"));
                }}
              >
                {">"}
              </button>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Members</h1>
          </div>
        </div>
        <div className="mt-8 flex flex-col" style={{ overflowX: "scroll" }}>
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-1 pr-1 text-left text-xs font-light text-gray-900 sm:pl-6"
                      ></th>
                      {roomInfo.activities ? (
                        roomInfo.activities.map((activity) => {
                          return (
                            <th
                              key={activity.name}
                              scope="col"
                              className="py-3.5 pl-1 pr-1 text-left text-xs font-light text-gray-900 sm:pl-6"
                            >
                              {activity.name}
                            </th>
                          );
                        })
                      ) : (
                        <td />
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {roomUsers
                      ? roomUsers.map((person, i) => (
                          <tr key={i}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={person.image}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium text-gray-900">
                                    {person.name}
                                  </div>
                                  <div className="text-gray-500">
                                    {person.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            {Object.keys(
                              pointData[curDay.format("DD/MM/YY")]
                            ).map((activityName) => {
                              for (let user in roomInfo.activities) {
                                if (
                                  roomInfo.activities[user].name == activityName
                                ) {
                                  for (let userId in pointData[
                                    curDay.format("DD/MM/YY")
                                  ][activityName]) {
                                    if (userId == person.uid) {
                                      return (
                                        <td
                                          key={userId + activityName}
                                          style={{ paddingLeft: "45px" }}
                                        >
                                          {
                                            pointData[
                                              curDay.format("DD/MM/YY")
                                            ][activityName][userId]
                                          }
                                        </td>
                                      );
                                    }
                                  }
                                }
                              }
                            })}

                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <a
                                href="#"
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Edit
                                <span className="sr-only">, {person.name}</span>
                              </a>
                            </td>
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
