import React, { useEffect, useState } from "react";
import "./CalendarContainer.css";
import {
  prevMonth,
  prevYear,
  nextMonth,
  nextYear,
  daysFromPrevMonthToAdd,
  daysFromNextMonthToAdd,
} from "../../utils/calendarFunctions";
import Day from "./day/Day";
import DayOfTheWeek from "./day/DayOfTheWeek";
import { ChevronLeft, ChevronRight } from "lucide-react";

function CalendarContainer({ setIsAddEventOpen, setSelectedDate, allPlans }) {
  const [displayDate, setDisplayDate] = useState(new Date());
  const [days, setDays] = useState([]);
  const [numberOfCalendarRows, setNumberOfCalendarRows] = useState();
  const [isPhone, setIsPhone] = useState(0);
  const [isSelectMonthOpen, setIsSelectMonthOpen] = useState(false);
  const [isSelectYearOpen, setIsSelectYearOpen] = useState(false);

  const closeSelections = () => {
    setIsSelectMonthOpen(false);
    setIsSelectYearOpen(false);
  };

  const openMonthSelection = () => {
    setIsSelectMonthOpen(!isSelectMonthOpen);
    setIsSelectYearOpen(false);
  };

  const openYearSelection = () => {
    setIsSelectMonthOpen(false);
    setIsSelectYearOpen(!isSelectYearOpen);
  };

  const handleMonthSelect = (month) => {
    setIsSelectYearOpen(false);
    const selectedMonth = months.indexOf(month);
    const newDate = new Date(displayDate);
    newDate.setMonth(selectedMonth);
    setDisplayDate(newDate);
    setIsSelectMonthOpen(false);
  };

  const handleYearSelect = (year) => {
    setIsSelectMonthOpen(false);
    const newDate = new Date(displayDate);
    newDate.setYear(year);
    setDisplayDate(newDate);
    setIsSelectYearOpen(false);
  };

  useEffect(() => {
    const getScreenWidth = () => {
      setIsPhone(window.innerWidth);
    };

    window.addEventListener("resize", getScreenWidth);
    getScreenWidth();

    return () => {
      window.removeEventListener("resize", getScreenWidth);
    };
  }, []);

  useEffect(() => {
    const daysInMonth = new Date(
      displayDate.getFullYear(),
      displayDate.getMonth() + 1,
      0
    ).getDate();
    setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));

    const prevDays = daysFromPrevMonthToAdd(displayDate);
    const nextDays = daysFromNextMonthToAdd(displayDate, prevDays);

    setNumberOfCalendarRows((prevDays + nextDays + daysInMonth) / 7 + 1);
  }, [displayDate]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "October",
    "September",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: 10 },
    (_, index) => new Date().getFullYear() + index
  );

  const handlePrevYearClick = () => {
    closeSelections();
    prevYear(setDisplayDate);
  };
  const handleNextYearClick = () => {
    closeSelections();
    nextYear(setDisplayDate);
  };
  const handlePrevMonthClick = () => {
    closeSelections();
    prevMonth(setDisplayDate);
  };
  const handleNextMonthClick = () => {
    closeSelections();
    nextMonth(setDisplayDate);
  };

  return (
    <div className="calendar-container">
      <div className="top">
        <div className="header" onClick={() => closeSelections()}>
          {isPhone > 1000 ? (
            <h1 style={{ fontSize: "32px" }}>MY PLANNER</h1>
          ) : isPhone > 400 ? (
            <h2 style={{ fontSize: "24px" }}>MY PLANNER</h2>
          ) : (
            <h2 style={{ fontSize: "18px" }}>MY PLANNER</h2>
          )}
        </div>
        <div className="years">
          <button onClick={handlePrevYearClick}>
            <ChevronLeft size={32} color="black" />
          </button>
          <div className="year-and-selection">
            <h2 onClick={() => openYearSelection()}>
              {displayDate.getFullYear()}
            </h2>
            {isSelectYearOpen && (
              <div className="year-selection">
                {years.map((year, index) => (
                  <div
                    key={index}
                    className="years-to-select"
                    onClick={() => handleYearSelect(year)}
                  >
                    {year}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button onClick={handleNextYearClick}>
            <ChevronRight size={32} color="black" />
          </button>
        </div>
        <div className="months">
          <button onClick={handlePrevMonthClick}>
            <ChevronLeft size={32} color="black" />
          </button>
          <div className="month-and-selection">
            <h2 onClick={() => openMonthSelection()}>
              {months[displayDate.getMonth()]}
            </h2>
            {isSelectMonthOpen && (
              <div className="month-selection">
                {months.map((month, index) => (
                  <div
                    key={index}
                    className="months-to-select"
                    onClick={() => handleMonthSelect(month)}
                  >
                    {month}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button onClick={handleNextMonthClick}>
            <ChevronRight size={32} color="black" />
          </button>
        </div>
      </div>
      <div className="days-block" onClick={() => closeSelections()}>
        <div
          className={`days ${
            numberOfCalendarRows === 6 ? "six-rows" : "seven-rows"
          }`}
        >
          <DayOfTheWeek />
          <Day
            days={days}
            displayDate={displayDate}
            setDisplayDate={setDisplayDate}
            setIsAddEventOpen={setIsAddEventOpen}
            setSelectedDate={setSelectedDate}
            allPlans={allPlans}
          />
        </div>
      </div>
    </div>
  );
}

export default CalendarContainer;
