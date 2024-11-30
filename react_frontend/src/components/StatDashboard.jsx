import useEmployeesData from "../utilities/dataFetches/useAllEmployeesData";

const StatDashboard = () => {
  const { allEmployeesFullInfo, allActiveEmployeesInfo } = useEmployeesData();
  // console.log(allEmployeesFullInfo);

  // Get the current date and set the current month range
  const today = new Date();
  const startOfCurrentMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );
  const endOfCurrentMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  );

  // Function to check if a date is in the current month
  const isDateInCurrentMonth = (dateString) => {
    const date = new Date(dateString);
    return date >= startOfCurrentMonth && date <= endOfCurrentMonth;
  };

  // Calculate the number of employees who joined this month
  const staffJoinedThisMonth = allEmployeesFullInfo.filter((employee) =>
    isDateInCurrentMonth(employee.employment_info.joining_date)
  ).length;

  // Calculate the number of employees who separated this month
  const staffSeparatedThisMonth = allEmployeesFullInfo.filter((employee) =>
    isDateInCurrentMonth(employee.separation_info.separation_effect_date)
  ).length;

  return (
    <div className="flex flex-col justify-center items-center my-28">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mb-10 text-center text-2xl sm:text-3xl font-semibold leading-9 tracking-tight">
          View
          <span className="text-gradient"> Live Dashboard</span> of Regular HR
          Status
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-5 md:gap-8">
        {/* Dashboard statistics */}
        <div className="stats shadow gap-2 md:gap-5">
          {/* Static "Total Applicant CV" Section */}
          <div className="stat gap-1 md:gap-3">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
            </div>
            <div className="space-y-5">
              <div className="stat-title">
                Total Applicant <br /> CV available
              </div>
              <div className="stat-value">3K+</div> {/* Static count */}
            </div>
          </div>

          {/* Dynamic "Active HR Staff" Section */}
          <div className="stat gap-1 md:gap-3">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <div className="space-y-5">
              <div className="stat-title">
                Total Human <br />
                Resource Staff
              </div>
              <div className="stat-value">{allActiveEmployeesInfo.length}</div>
            </div>
          </div>
        </div>

        <div className="stats shadow gap-2 md:gap-5">
          {/* Dynamic "Staff Joined This Month" Section */}
          <div className="stat gap-1 md:gap-3">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <div className="space-y-5">
              <div className="stat-title">
                Staff Joined <br /> (This Month)
              </div>
              <div className="stat-value">{staffJoinedThisMonth}</div>
            </div>
          </div>

          {/* Dynamic "Staff Separated This Month" Section */}
          <div className="stat gap-1 md:gap-3">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l-3 3m0 0l3 3m-3-3h12m-3-3l3 3m0 0l-3 3"
                ></path>
              </svg>
            </div>
            <div className="space-y-5">
              <div className="stat-title">
                Staff Separated <br /> (This Month)
              </div>
              <div className="stat-value">{staffSeparatedThisMonth}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatDashboard;
