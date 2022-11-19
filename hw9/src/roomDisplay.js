import { useState } from "react";
import { collection } from "@firebase/firestore";
import { firestore } from "./initialize";
import { useEffect } from "react";
import { getDocs } from "@firebase/firestore";

export default function RoomDisplay({ roomID }) {
  const [allUsers, setAllUsers] = useState([]);
  const [roomInfo, setRoomInfo] = useState({});
  const [roomUsers, setRoomUsers] = useState([]);

  const roomCollectionRef = collection(firestore, "rooms");
  const usersCollectionRef = collection(firestore, "users");

  roomID = "6f2iBYYI7xMJqE96YpDa";

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

  console.log(allUsers, roomInfo, roomUsers);
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
        currentRoomUsers.push(personData);
      }
    }
    setRoomUsers(currentRoomUsers);
  }

  console.log(roomUsers);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div style={{ height: "10vh" }} />
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Edit
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col" style={{ overflowX: "scroll" }}>
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {roomInfo.activities ? (
                      roomInfo.activities.map((activity) => {
                        return (
                          <th
                            scope="col"
                            className="py-3.5 pl-1 pr-1 text-left text-xs font-light text-gray-900 sm:pl-6"
                          >
                            {activity.name}
                          </th>
                        );
                      })
                    ) : (
                      <div />
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {roomUsers.map((person) => (
                    <tr key={person.id}>
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
                            <div className="text-gray-500">{person.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.role}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {person.name}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
