import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./initialize";
import React, { useEffect, useRef, useState } from "react";
import { firestore } from "./initialize";
import { addDoc, collection, getDocs } from "@firebase/firestore";
import { useNavigate } from "react-router";
import VectorTR from "./assets/Vector.svg";
import Logo from "./assets/logo.svg";
import EllipseInner from "./assets/ellipse_inner.svg";
import EllipseOuter from "./assets/ellipse_outer.svg";
import Keep from "./assets/Group 1.svg";
import Up from "./assets/Group 2.svg";

function App() {
  const googleProvider = new GoogleAuthProvider();

  const [users, setUsers] = useState([]);
  const [curUserData, setCurUserData] = useState(null);
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

  const navigateToDashboard = () => {
    console.log(curUserData);
    navigate("/dashboard", { state: { test: curUserData } });
  };

  if (curUserData != null) {
    //called after user is authenticated
    navigateToDashboard();
  }

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
          userData = users[i];
          break;
        }
      }
      if (is_new) {
        console.log("New");
        addDoc(usersCollectionRef, userData);
      } else {
        console.log("Existing");
      }
      setCurUserData(userData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <img src={VectorTR} style={{ float: "right", height: "100vh" }}></img>
      <img
        src={EllipseOuter}
        style={{ float: "left", height: "45vh", position: "fixed", bottom: 0 }}
      ></img>
      <img
        src={EllipseInner}
        style={{ float: "left", height: "30vh", position: "fixed", bottom: 0 }}
      ></img>
      <div
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex" }}>
          <img src={Logo} />
        </div>
        <div
          className="text-yellow-500 text-4xl font-bold"
          style={{ marginBottom: "2.5vh" }}
        />
        <img src={Up} style={{ marginBottom: "15px" }} />
        <img src={Keep} />
        <div
          className="text-yellow-500 text-4xl font-bold"
          style={{ marginBottom: "2.5vh" }}
        />
        <div>
          <button
            type="button"
            class="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2"
            onClick={GoogleLogin}
          >
            SIGN IN WITH GOOGLE
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
