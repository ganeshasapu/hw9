import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
//import { isButtonElement } from 'react-router-dom/dist/dom'
import { auth } from "./initialize";
import React, { useRef } from "react";
import { async } from "@firebase/util";
import { firestore } from "./initialize";
import { addDoc, collection } from "@firebase/firestore";

function App() {
  const googleProvider = new GoogleAuthProvider();
  const messageRef = useRef();
  const ref = collection(firestore, "rooms");

  console.log(ref);

  const addRoom = async (e) => {
    e.preventDefault();
    let data = {
      message: messageRef.current.value,
    };

    try {
      addDoc(ref, data);
    } catch (e) {
      console.log(e);
    }
  };

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
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
