import React, { useEffect, useState } from "react";
import "./DisplayEvents.css";
import EventForm from "./eventForm/EventForm";
import EventsByDate from "./EventsByDate";
import { postNewPlan } from "../../../utils/fetch";

function DisplayEventForm({
  setIsAddEventOpen,
  selectedDate,
  userEmail,
  setAllPlans,
  allPlans,
}) {
  const [selectedDateDisplay, setSelectedDayDisplay] = useState(undefined);
  const [eventTitle, setEventTitle] = useState("My event");
  const [eventColor, setEventColor] = useState("#e6194b");

  useEffect(() => {
    setSelectedDayDisplay(
      selectedDate.getDate() +
        ". " +
        (selectedDate.getMonth() + 1) +
        ". " +
        selectedDate.getFullYear() +
        "."
    );
  }, [selectedDate]);

  const handleAddNewEventClick = async () => {
    const newPlan = await postNewPlan(
      eventColor,
      eventTitle,
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() + 1
      ),
      userEmail
    );

    setAllPlans((prev) => [
      ...prev,
      newPlan.user.plans[newPlan.user.plans.length - 1],
    ]);

    setIsAddEventOpen(false);
  };

  return (
    <div className="event-display-form">
      <div className="event-form-date">
        <h2>{selectedDateDisplay}</h2>
      </div>
      <div className="existing-events">
        <EventsByDate
          userEmail={userEmail}
          setAllPlans={setAllPlans}
          allPlans={allPlans}
          selectedDate={selectedDate}
        />
      </div>
      <div className="new-event-form">
        <EventForm
          eventColor={eventColor}
          setEventColor={setEventColor}
          setEventTitle={setEventTitle}
        />
      </div>
      <div className="event-form-button">
        <button onClick={() => handleAddNewEventClick()}>Add New Event</button>
      </div>
    </div>
  );
}

export default DisplayEventForm;
