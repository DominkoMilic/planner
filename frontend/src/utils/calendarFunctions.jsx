const nextMonth = (setDisplayDate) => {
  setDisplayDate((prevDate) => {
    const newDate = new Date(prevDate);
    newDate.setMonth(newDate.getMonth() + 1);
    return newDate;
  });
};

const prevMonth = (setDisplayDate) => {
  setDisplayDate((prevDate) => {
    const newDate = new Date(prevDate);
    newDate.setMonth(newDate.getMonth() - 1);
    return newDate;
  });
};

const nextYear = (setDisplayDate) => {
  setDisplayDate((prevDate) => {
    const newDate = new Date(prevDate);
    newDate.setFullYear(newDate.getFullYear() + 1);
    return newDate;
  });
};

const prevYear = (setDisplayDate) => {
  setDisplayDate((prevDate) => {
    const newDate = new Date(prevDate);
    newDate.setFullYear(newDate.getFullYear() - 1);
    return newDate;
  });
};

const daysFromPrevMonthToAdd = (displayDate) => {
  let daysToInsertBefore =
    new Date(displayDate.getFullYear(), displayDate.getMonth(), 1).getDay() - 1;

  daysToInsertBefore =
    daysToInsertBefore === -1 ? daysToInsertBefore + 7 : daysToInsertBefore;

  return daysToInsertBefore;
};

const daysFromNextMonthToAdd = (displayDate, daysToInsertBefore) => {
  let daysToInsertAfter =
    7 -
    ((new Date(
      displayDate.getFullYear(),
      displayDate.getMonth() + 1,
      0
    ).getDate() +
      daysToInsertBefore) %
      7);

  daysToInsertAfter = daysToInsertAfter === 7 ? 0 : daysToInsertAfter;

  return daysToInsertAfter;
};

const getLastDayOfPrevMonth = (displayDate) => {
  return new Date(
    displayDate.getFullYear(),
    displayDate.getMonth(),
    0
  ).getDate();
};

const setPrevDaysFunction = (displayDate, setPrevDays) => {
  const daysToInsertBefore = daysFromPrevMonthToAdd(displayDate);
  const lastDayPrevMonth = getLastDayOfPrevMonth(displayDate);

  setPrevDays(
    new Array(daysToInsertBefore)
      .fill(null)
      .map((_, i) => `${lastDayPrevMonth - (daysToInsertBefore - 1) + i}`)
  );
};

const setNextDaysFunction = (displayDate, setNextDays) => {
  const daysToInsertBefore = daysFromPrevMonthToAdd(displayDate);

  const daysToInsertAfter = daysFromNextMonthToAdd(
    displayDate,
    daysToInsertBefore
  );

  setNextDays(
    new Array(daysToInsertAfter).fill(null).map((_, i) => `${i + 1}`)
  );
};

const formatDate = (date) => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

const findPlanForDate = (plans, date) => {
  const dateArray = date.toISOString().split("T")[0].split("-");
  const plansForDate = [];

  plans?.forEach((plan) => {
    const planDateArray = plan.date.split("T")[0].split("-");
    if (
      dateArray[0] === planDateArray[0] &&
      dateArray[1] === planDateArray[1] &&
      dateArray[2] === planDateArray[2]
    ) {
      plansForDate.push({ color: plan.color, text: plan.text, id: plan._id });
    }
  });

  return plansForDate;
};

export {
  prevMonth,
  prevYear,
  nextMonth,
  nextYear,
  setPrevDaysFunction,
  setNextDaysFunction,
  formatDate,
  findPlanForDate,
  daysFromNextMonthToAdd,
  daysFromPrevMonthToAdd,
};
