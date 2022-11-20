import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./dashboard";
import RoomDisplay from "./roomDisplay";
import Task from "./task";
import Sidebar from "./sidebar";
import UsersPage from "./user";
import JoinPage from "./join";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/roomDisplay" element={<RoomDisplay />} />
        <Route path="/task" element={<Task />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/join" element={<JoinPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
