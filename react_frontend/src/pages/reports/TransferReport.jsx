import { useState } from "react";
import useEmployeesData from "../../utilities/dataFetches/useAllEmployeesData";
import LoadingSpinner from "../../utilities/LoadingSpinner";
import DateSelector from "./reports_utility_components/DateSelectorComponent";
import calculateCounts from "../../utilities/CalculateUtils/employeeCalculateCounts";
import getDatesForDuration from "../../utilities/CalculateUtils/useGetDatesForDuration";
import StatisticsCard from "./reports_utility_components/StatisticsCard";

import EmployeeInfoTable from "../HR_staff_management/AllEmployeeList/EmployeeInfoTable";
import useTitle from "../../utilities/useTitle";

const TransferReport = () => {
  useTitle("Transfer Report");

  const { allEmployeesFullInfo, loading, error } = useEmployeesData();
  // console.log(allEmployeesFullInfo);

  // to track the filter parameter
  const [selectedDuration, setSelectedDuration] = useState("this_month");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Show loading spinner while loading
  if (loading) {
    return (
      <div className="my-32">
        <LoadingSpinner />
      </div>
    );
  }

  // Show error messages
  if (error) {
    return (
      <div className="mt-6 text-center text-base text-red-600">{error}</div>
    );
  }

  // Helper function to filter employees by transfer date
  const filterByTransferDate = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return allEmployeesFullInfo.filter((employee) => {
      // Check if the employee has transfer info
      if (employee.transfer_info && Array.isArray(employee.transfer_info)) {
        // Loop through the transfer_info array and check the dates
        return employee.transfer_info.some((transfer) => {
          const transferDate = new Date(transfer.transfer_effective_date);
          // getting the number of employee transferred within the filtered duration
          return transferDate >= start && transferDate <= end;
        });
      }
      return false; // No transfer info for this employee
    });
  };

  // Filter employees based on selected duration
  const { startDate, endDate } = getDatesForDuration(
    selectedDuration,
    selectedYear
  );
  const filteredEmployees = filterByTransferDate(startDate, endDate);

  // Destructure the returned counts from the function to use them separately
  const { departmentCount, designationCount, jobLocationCount } =
    calculateCounts(filteredEmployees);

  return (
    <div className="mt-16 mb-10 mx-10">
      <div className="sm:mx-auto">
        <h2 className="my-10 text-center text-2xl font-semibold leading-9 tracking-tight">
          You can get <span className="text-gradient">Transfer Report</span> by
          various filtering options
        </h2>
      </div>

      <div className="my-6 flex justify-center items-center gap-2">
        {/* Select Option fields for filtering */}
        <DateSelector
          selectedDuration={selectedDuration}
          onChange={setSelectedDuration}
        />
        <input
          type="number"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          placeholder="Year"
          className="input input-bordered w-32 rounded-r-full"
        />
      </div>

      <div className="flex flex-col md:flex-row w-full">
        {/* Section for Departments */}
        <StatisticsCard
          title="Transferred (from Selected Duration) by Department"
          data={departmentCount}
        />

        <div className="divider divider-horizontal"></div>

        {/* Section for Designations */}
        <StatisticsCard
          title="Transferred (from Selected Duration) by Designation"
          data={designationCount}
        />

        <div className="divider divider-horizontal"></div>

        {/* Section for Job Locations */}
        <StatisticsCard
          title="Transferred (from Selected Duration) by Job Location"
          data={jobLocationCount}
        />
      </div>

      {filteredEmployees.length > 0 && (
        <div>
          <h2 className="text-center text-2xl font-semibold leading-8 mt-10 mb-4">
            <span className="text-gradient">
              All ({filteredEmployees?.length}) Employee
            </span>{" "}
            Info
          </h2>
          <EmployeeInfoTable
            filteredEmployees={filteredEmployees}
            reportType="transfer"
          ></EmployeeInfoTable>
        </div>
      )}
    </div>
  );
};

export default TransferReport;
