import React, { useEffect, useRef, useState } from "react";
import { auth, firestore } from "./initialize";
import {
  addDoc,
  doc,
  getDocs,
  collection,
  getDoc,
  query,
  where,
} from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useLocation } from "react-router";
function JoinPage(props) {
  let { state } = useLocation();
  const [curClientInfo, setCurClientInfo] = useState(props);
  const [curUserData, setCurUserData] = useState(null);

  console.log(state.test.roomsIn);
  const submit = (e) => {
    let x = document.getElementById("email").value;
    if (state.test.roomsIn.includes(x)) {
      return;
    } else {
      state.test.roomsIn.push(x);
    }
    e.preventDefault();
    console.log(state);
  };

  return (
    <form onSubmit={submit}>
      <input id="email" />
      <button>Submit</button>
    </form>
  );
}
export default JoinPage;
