export const dateIsInRange = (date, start, end) =>
  start.toDateString() === date.toDateString() ||
  date.toDateString() === end.toDateString() ||
  (start < date && date < end);

export const getPercentageOfDaySpend = date => {
  const startHours = date.getHours();
  const startMinutes = date.getMinutes();

  return (startHours + startMinutes / 60) / 24 * 100;
};
