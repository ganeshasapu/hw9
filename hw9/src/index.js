import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./dashboard";
import RoomDisplay from "./roomDisplay";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/roomDisplay" element={<RoomDisplay />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
