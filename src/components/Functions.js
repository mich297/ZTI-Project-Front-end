export const actualDate = () => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  return [dd, mm, yyyy];
};

export const dayPerMonth = (month, year) => {
  let days = new Date(year, month, 0).getDate();
  let daysArray = new Array(days);
  for (let i = 0; i < days; i++) daysArray[i] = i + 1;
  return [...daysArray];
};

export const textDate = (month) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[month - 1];
};

export const dayDisplay = (day) => {
  if (day <= 9) return `0${day}`;
  else return day;
};

export const isRegistered = (conf) => {
  const result = conf.participants.find(
    (user) => user.login === localStorage.getItem("user")
  );
  if (result !== undefined) return true;
  else return false;
};

export const checkColor = (upcoming, tempDate, actualDateTemp, i) => {
  if (
    upcoming[i] !== undefined &&
    tempDate[0] === upcoming[i].start[0] &&
    tempDate[1] === upcoming[i].start[1] &&
    tempDate[2] === upcoming[i].start[2] &&
    tempDate[0] === actualDateTemp[0] &&
    tempDate[1] === actualDateTemp[1] &&
    tempDate[2] === actualDateTemp[2]
  )
    return "singleDayBoxPlannedToday";
  else if (
    upcoming[i] !== undefined &&
    tempDate[0] === upcoming[i].start[0] &&
    tempDate[1] === upcoming[i].start[1] &&
    tempDate[2] === upcoming[i].start[2]
  )
    return "singleDayBoxPlanned";
  else if (
    tempDate[0] === actualDateTemp[0] &&
    tempDate[1] === actualDateTemp[1] &&
    tempDate[2] === actualDateTemp[2]
  )
    return "singleDayBoxToday";
  else return "singleDayBox";
};
