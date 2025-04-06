import React from "react";
import "./Day.css";
import SelectedMonthDays from "./SelectedMonthDays";
import NextMonthDays from "./NextMonthDays";
import PrevMonthDays from "./PrevMonthDays";

function Day({
  days,
  displayDate,
  setDisplayDate,
  setIsAddEventOpen,
  setSelectedDate,
  allPlans,
}) {
  return (
    <>
      <PrevMonthDays
        displayDate={displayDate}
        setDisplayDate={setDisplayDate}
        allPlans={allPlans}
      />

      <SelectedMonthDays
        days={days}
        displayDate={displayDate}
        setIsAddEventOpen={setIsAddEventOpen}
        setSelectedDate={setSelectedDate}
        allPlans={allPlans}
      />

      <NextMonthDays
        displayDate={displayDate}
        setDisplayDate={setDisplayDate}
        allPlans={allPlans}
      />
    </>
  );
}

export default Day;
