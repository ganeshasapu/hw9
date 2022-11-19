import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
//import { isButtonElement } from 'react-router-dom/dist/dom'
import { auth } from "./initialize";
import React, { useRef } from "react";
import { async } from "@firebase/util";
import { firestore } from "./initialize";
import { addDoc, collection } from "@firebase/firestore";
import { setDoc } from "@firebase/firestore";
import { getDoc } from "@firebase/firestore";
import { doc } from "@firebase/firestore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

function App() {
  const googleProvider = new GoogleAuthProvider();
  const messageRef = useRef();
  const rooms = collection(firestore, "rooms");
  const users = collection(firestore, "users");

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
      };

      //addDoc(users, userData);
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
