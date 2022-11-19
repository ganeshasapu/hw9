import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { LoginPage } from "./webpages/LoginPage";
import { GroupSelectPage } from "./webpages/GroupSelectPage";
import { LeaderboardPage } from "./webpages/LeaderboardPage";
import { ProfilePage } from "./webpages/ProfilePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PointsPage } from "./webpages/PointsPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/groupselect" element={<GroupSelectPage />} />
        <Route path="/leaderboards" element={<LeaderboardPage />} />
        <Route path="/points" element={<PointsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
