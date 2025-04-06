import React, { useState, useEffect } from "react";
import "./Day.css";

const dayOfTheWeekMax = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const dayOfTheWeekMid = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dayOfTheWeekMin = ["M", "T", "W", "T", "F", "S", "S"];

function DayOfTheWeek() {
  const [daysOfTheWeek, setDaysOfTheWeek] = useState(() => {
    if (window.innerWidth >= 1200) return dayOfTheWeekMax;
    if (window.innerWidth >= 500) return dayOfTheWeekMid;
    return dayOfTheWeekMin;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setDaysOfTheWeek(dayOfTheWeekMax);
      } else if (window.innerWidth >= 500) {
        setDaysOfTheWeek(dayOfTheWeekMid);
      } else {
        setDaysOfTheWeek(dayOfTheWeekMin);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {daysOfTheWeek.map((day, index) => (
        <div key={index} className="day-of-the-week-block">
          {day}
        </div>
      ))}
    </>
  );
}

export default DayOfTheWeek;
