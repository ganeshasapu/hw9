import React, { useEffect, useRef, useState } from "react";
import { firestore } from "./initialize";
import { addDoc, collection, getDocs } from "@firebase/firestore";
import moment from "moment";

moment().format();

const people = [
  { date: "Last 7 days" },
  {
    date: moment().format("MMM Do YYYY"),
    title: "19",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    date: moment().subtract(1, "days").format("MMM Do YYYY"),
    title: "18",
    email: "dylanbroad@example.com",
    role: "Exec",
  },
  {
    date: moment().subtract(2, "days").format("MMM Do YYYY"),
    title: "17",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    date: moment().subtract(3, "days").format("MMM Do YYYY"),
    title: "16",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    date: moment().subtract(4, "days").format("MMM Do YYYY"),
    title: "15",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    date: moment().subtract(5, "days").format("MMM Do YYYY"),
    title: "14",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    date: moment().subtract(6, "days").format("MMM Do YYYY"),
    title: "13",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
];

export default function UsersPage() {
  const [rooms, setRooms] = useState([]);
  const [curUserData, setCurUserData] = useState(null);
  const roomsCollectionRef = collection(firestore, "rooms");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(roomsCollectionRef);
      var test = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRooms(test);
    };
    getUsers();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8  ">
      <div className="sm:flex sm:items-center"></div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-right md:px-6 lg:px-8    ">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table
                className="min-w-full divide-y divide-gray-300"
                style={{ margin: "px" }}
              >
                <thead className="bg-gray-50">
                  {rooms.map((activity) => {
                    return (
                      <th
                        key={activity.name}
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        {activity.name}
                      </th>
                    );
                  })}
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                  {people.map((person) => {
                    return (
                      <tr key={person.uid} className="divide-x divide-gray-200">
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                          {person.date}
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                          {person.title}
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                          {person.email}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">
                          {person.role}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
