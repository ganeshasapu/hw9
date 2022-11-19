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

function App() {
  const googleProvider = new GoogleAuthProvider();
  const messageRef = useRef();
  const rooms = collection(firestore, "rooms");
  const users = collection(firestore, "users");

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

      console.log(auth.currentUser);
      const user = auth.currentUser;
      if (user !== null) {
        // The user object has basic properties such as display name, email, etc.
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;

        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        const uid = user.uid;
      }
      //addDoc(users, userData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={GoogleLogin}>Auth</button>
      <input type="text" ref={messageRef} />
      <button type="submit" onClick={addRoom}>
        Save
      </button>
      <div>Home</div>
    </div>
  );
}

export default App;
