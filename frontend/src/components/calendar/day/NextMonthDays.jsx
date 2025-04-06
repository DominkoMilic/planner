import React, { useEffect, useState } from "react";
import "./Day.css";
import {
  findPlanForDate,
  formatDate,
  setNextDaysFunction,
} from "../../../utils/calendarFunctions";

function NextMonthDays({ displayDate, setDisplayDate, allPlans }) {
  const [nextDays, setNextDays] = useState([]);

  useEffect(() => {
    setNextDaysFunction(displayDate, setNextDays);
  }, [displayDate]);

  const openNextMonthFromDay = () => {
    setDisplayDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1, 1);
      return newDate;
    });
  };

  return (
    <>
      {nextDays.map((day, index) => {
        const date = new Date(displayDate);
        date.setDate(parseInt(day, 10));
        date.setMonth(displayDate.getMonth() + 1);
        const plansForDay = findPlanForDate(allPlans, date);

        return (
          <div
            key={index}
            className="day-block-after"
            onClick={() => {
              openNextMonthFromDay();
            }}
          >
            <div className="day">
              <div
                className={`day-number ${
                  formatDate(new Date()) ===
                  formatDate(
                    new Date(
                      displayDate.getFullYear(),
                      displayDate.getMonth() + 1,
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

export default NextMonthDays;
