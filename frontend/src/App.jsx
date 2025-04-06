import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import Calendar from "./pages/calendar/Calendar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
  );
}

export default App;
