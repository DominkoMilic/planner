import React from "react";
import "./MainContainer.css";
import CalendarContainer from "../calendar/CalendarContainer";

function MainContainer({ setIsAddEventOpen, setSelectedDate, allPlans }) {
  return (
    <div className="main-page-container">
      <CalendarContainer
        setIsAddEventOpen={setIsAddEventOpen}
        setSelectedDate={setSelectedDate}
        allPlans={allPlans}
      />
    </div>
  );
}

export default MainContainer;
