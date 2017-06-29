const arrayOf11Items = new Array(11);

const xAxe = [
  '12 AM',
  ...arrayOf11Items.fill(1).map((val, i) => `${i + 1} AM`),
  '12 PM',
  ...arrayOf11Items.fill(1).map((val, i) => `${i + 1} PM`),
];

export const getYAxe = (year, month) => {
  // const currentDate = new Date();
  // const currentYear = currentDate.getFullYear();
  // const currentMonth = currentDate.getMonth() + 1;
  const numberOfDaysInCurrentMonth = new Date(year, month, 0).getDate();

  const xAxeRows = new Array(numberOfDaysInCurrentMonth)
    .fill(1)
    .map((val, i) => new Date(year, month, i + 1));

  return xAxeRows;
};

export const getXAxe = () => xAxe;
