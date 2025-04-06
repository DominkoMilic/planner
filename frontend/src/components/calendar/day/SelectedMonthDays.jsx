import React, { useEffect, useState } from "react";
import "./Day.css";
import { findPlanForDate, formatDate } from "../../../utils/calendarFunctions";

function SelectedMonthDays({
  days,
  displayDate,
  setIsAddEventOpen,
  setSelectedDate,
  allPlans,
}) {
  const handleAddEventClick = (day) => {
    const clickedDate = new Date(
      displayDate.getFullYear(),
      displayDate.getMonth(),
      day
    );

    setSelectedDate(clickedDate);
    setIsAddEventOpen(true);
  };

  return (
    <>
      {days.map((day, index) => {
        const date = new Date(
          displayDate.getFullYear(),
          displayDate.getMonth(),
          day + 1
        );
        const plansForDay = findPlanForDate(allPlans, date);

        return (
          <div
            key={index}
            className="day-block"
            onClick={() => handleAddEventClick(day)}
          >
            <div className="day">
              <div
                className={`day-number ${
                  formatDate(new Date()) ===
                  formatDate(
                    new Date(
                      displayDate.getFullYear(),
                      displayDate.getMonth(),
                      day
                    )
                  )
                    ? "today"
                    : ""
                }`}
              >
                {day}
              </div>
              <div className="day-underline"></div>
              <div className="event-display">
                {plansForDay.length > 0 &&
                  plansForDay.map((day, index) => {
                    return (
                      <div className="single-event-calendar" key={index}>
                        <div
                          className="event-color-calendar"
                          style={{ backgroundColor: day.color }}
                        ></div>
                        <div>{day.text}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default SelectedMonthDays;
