// Function to get start and end dates based on selected duration
const getDatesForDuration = (duration, selectedYear) => {
  const today = new Date();
  let startDate = new Date();
  let endDate = new Date();

  // Check if the selected year is a leap year
  const isLeapYear =
    (selectedYear % 4 === 0 && selectedYear % 100 !== 0) ||
    selectedYear % 400 === 0;

  // If it's a leap year, February has 29 days, otherwise 28 days
  const lastDayOfFebruary = isLeapYear ? 29 : 28;

  switch (duration) {
    case "this_month":
      // First day of the current month
      startDate = new Date(selectedYear, today.getMonth(), 1);
      // Last day of the current month
      endDate = new Date(selectedYear, today.getMonth() + 1, 0);
      break;

    case "last_month":
      // 'today.getMonth()' returns the current month (0 for January, 1 for February, and so on).
      // Subtracting 1 from it gives the previous month.
      startDate.setMonth(today.getMonth() - 1);

      // This sets the day of the startDate to the 1st day of the month.
      startDate.setDate(1);

      // This line sets the endDate to the last day of the previous month.
      endDate.setDate(0);
      break;

    case "1st_QTR":
      // First day of January
      startDate = new Date(selectedYear, 0, 1);
      // Last day of March
      endDate = new Date(selectedYear, 2, 31);
      break;

    case "2nd_QTR":
      // First day of April
      startDate = new Date(selectedYear, 3, 1);
      // Last day of June
      endDate = new Date(selectedYear, 5, 30);
      break;

    case "3rd_QTR":
      // First day of July
      startDate = new Date(selectedYear, 6, 1);
      // Last day of September
      endDate = new Date(selectedYear, 8, 30);
      break;

    case "4th_QTR":
      // First day of October
      startDate = new Date(selectedYear, 9, 1);
      // Last day of December
      endDate = new Date(selectedYear, 11, 31);
      break;

    case "1st_year_half":
      // First day of January
      startDate = new Date(selectedYear, 0, 1);
      // Last day of June
      endDate = new Date(selectedYear, 5, 30);
      break;

    case "2nd_year_half":
      // First day of July
      startDate = new Date(selectedYear, 6, 1);
      // Last day of December
      endDate = new Date(selectedYear, 11, 31);
      break;

    case "Full_year":
      // First day of January
      startDate = new Date(selectedYear, 0, 1);
      // Last day of December
      endDate = new Date(selectedYear, 11, 31);
      break;

    case "January":
      // First day of January
      startDate = new Date(selectedYear, 0, 1);
      // Last day of January
      endDate = new Date(selectedYear, 0, 31);
      break;

    case "February":
      // First day of February
      startDate = new Date(selectedYear, 1, 1);
      // Set the last day of February accordingly
      endDate = new Date(selectedYear, 1, lastDayOfFebruary);
      break;

    case "March":
      // First day of March
      startDate = new Date(selectedYear, 2, 1);
      // Last day of March
      endDate = new Date(selectedYear, 2, 31);
      break;

    case "April":
      // First day of April
      startDate = new Date(selectedYear, 3, 1);
      // Last day of April
      endDate = new Date(selectedYear, 3, 30);
      break;

    case "May":
      // First day of May
      startDate = new Date(selectedYear, 4, 1);
      // Last day of May
      endDate = new Date(selectedYear, 4, 31);
      break;

    case "June":
      // First day of June
      startDate = new Date(selectedYear, 5, 1);
      // Last day of June
      endDate = new Date(selectedYear, 5, 30);
      break;

    case "July":
      // First day of July
      startDate = new Date(selectedYear, 6, 1);
      // Last day of July
      endDate = new Date(selectedYear, 6, 31);
      break;

    case "August":
      // First day of August
      startDate = new Date(selectedYear, 7, 1);
      // Last day of August
      endDate = new Date(selectedYear, 7, 31);
      break;

    case "September":
      // First day of September
      startDate = new Date(selectedYear, 8, 1);
      // Last day of September
      endDate = new Date(selectedYear, 8, 30);
      break;

    case "October":
      // First day of October
      startDate = new Date(selectedYear, 9, 1);
      // Last day of October
      endDate = new Date(selectedYear, 9, 31);
      break;

    case "November":
      // First day of November
      startDate = new Date(selectedYear, 10, 1);
      // Last day of November
      endDate = new Date(selectedYear, 10, 30);
      break;

    case "December":
      // First day of December
      startDate = new Date(selectedYear, 11, 1);
      // Last day of December
      endDate = new Date(selectedYear, 11, 31);
      break;

    default:
      // Default to the entire year (from January 1 to December 31)
      startDate = new Date(selectedYear, 0, 1);
      endDate = new Date(selectedYear, 11, 31);
      break;
  }

  // This will return an object with startDate and endDate in 'YYYY-MM-DD' format
  return {
    // Convert the startDate object to ISO string format like: 'YYYY-MM-DDTHH:MM:SSZ',
    // Split it by "T" to separate date and time, and take the date part (before "T")
    startDate: startDate.toISOString().split("T")[0],

    // Similar approach like startDate...
    endDate: endDate.toISOString().split("T")[0],
  };
};

export default getDatesForDuration;
