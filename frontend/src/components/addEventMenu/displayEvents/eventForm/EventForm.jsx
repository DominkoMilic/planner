import React from "react";
import "./EventForm.css";
import ColorWheel from "./colorWheel/ColorWheel";

function EventForm({ eventColor, setEventColor, setEventTitle }) {
  const handleTitleChange = (e) => {
    setEventTitle(e.target.value);
    if (e.target.value === "") {
      setEventTitle("My event");
    }
  };

  return (
    <div className="form-container">
      Add Event:
      <br />
      <div className="add-title">
        Title:
        <input
          className="add-title-input"
          type="text"
          placeholder="Title..."
          onChange={handleTitleChange}
        ></input>
      </div>
      Color:
      <ColorWheel eventColor={eventColor} setEventColor={setEventColor} />
    </div>
  );
}

export default EventForm;
