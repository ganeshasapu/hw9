import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./initialize";
import React, { useEffect, useRef, useState } from "react";
import { firestore } from "./initialize";
import { addDoc, collection, getDocs } from "@firebase/firestore";
import { useNavigate } from "react-router";

function App() {
  const googleProvider = new GoogleAuthProvider();
  const messageRef = useRef();
  const rooms = collection(firestore, "rooms");

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(firestore, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getUsers();
  }, []);

  console.log(users);

  const navigate = useNavigate();

  const navigateToLogin = () => {
    // 👇️ navigate to /contacts
    navigate("/login");
  };

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

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      let userData = {
        name: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid,
      };

      var is_new = true;
      for (let i = 0; i < users.length; i++) {
        if (users[i].uid == result.user.uid) {
          is_new = false;
        } else {
        }
      }
      if (is_new) {
        addDoc(usersCollectionRef, userData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={GoogleLogin}>Auth</button>
      <input type="text" ref={messageRef} />
      <button
        type="submit"
        onClick={(e) => {
          addRoom(e);
          navigateToLogin();
        }}
      >
        Save
      </button>
      <div>Home</div>
    </div>
  );
}

export default App;
