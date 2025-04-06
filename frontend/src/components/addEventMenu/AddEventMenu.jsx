import React from "react";
import "./AddEventMenu.css";
import DisplayEventForm from "./displayEvents/DisplayEvents";

function AddEventMenu({
  isAddEventOpen,
  setIsAddEventOpen,
  selectedDate,
  userEmail,
  setAllPlans,
  allPlans,
}) {
  const handleCloseEventMenuClick = () => {
    setIsAddEventOpen(false);
  };

  if (!isAddEventOpen) return <></>;

  return (
    <div className="add-event-menu-background">
      <div className="add-event-menu-container">
        <div className="top-add-event-menu">
          <button onClick={handleCloseEventMenuClick}>X</button>
        </div>
        <DisplayEventForm
          setIsAddEventOpen={setIsAddEventOpen}
          selectedDate={selectedDate}
          userEmail={userEmail}
          setAllPlans={setAllPlans}
          allPlans={allPlans}
        />
      </div>
    </div>
  );
}

export default AddEventMenu;
