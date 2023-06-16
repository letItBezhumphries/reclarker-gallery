function transformDate(startDateString, endDateString) {
  const months = {
    1: "JAN",
    2: "FEB",
    3: "MAR",
    4: "APR",
    5: "MAY",
    6: "JUN",
    7: "JUL",
    8: "AUG",
    9: "SEP",
    10: "OCT",
    11: "NOV",
    12: "DEC",
  };

  let startDate = startDateString.split(":");
  let endDate = endDateString.split(":");
  let startMonth, endMonth;
  let eventDates;

  if (parseInt(startDate[0]) < 10) {
    startMonth = months[startDate[0][1]];
  } else {
    startMonth = months[startDate[0]];
  }

  if (parseInt(endDate[0]) < 10) {
    endMonth = months[endDate[0][1]];
  } else {
    endMonth = months[endDate[0]];
  }

  eventDates = `${startMonth} ${startDate[1]},${startDate[2]} - ${endMonth} ${endDate[1]},${endDate[2]}`;
  return eventDates;
}

export default transformDate;
