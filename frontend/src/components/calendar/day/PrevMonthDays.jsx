import React, { useEffect, useState } from "react";
import "./Day.css";
import {
  findPlanForDate,
  formatDate,
  setPrevDaysFunction,
} from "../../../utils/calendarFunctions";

function PrevMonthDays({ displayDate, setDisplayDate, allPlans }) {
  const [prevDays, setPrevDays] = useState([]);

  useEffect(() => {
    setPrevDaysFunction(displayDate, setPrevDays);
  }, [displayDate]);

  const openPrevMonthFromDay = () => {
    setDisplayDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1, 1);
      return newDate;
    });
  };

  return (
    <>
      {prevDays.map((day, index) => {
        const date = new Date(displayDate);
        date.setMonth(displayDate.getMonth() - 1);
        date.setDate(parseInt(day, 10));

        const plansForDay = findPlanForDate(allPlans, date);

        return (
          <div
            key={index}
            className="day-block-before"
            onClick={() => openPrevMonthFromDay()}
          >
            <div className="day">
              <div
                className={`day-number ${
                  formatDate(new Date()) === formatDate(date) ? "today" : ""
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

export default PrevMonthDays;
