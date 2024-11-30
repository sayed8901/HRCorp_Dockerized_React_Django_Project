import { useState } from "react";
import LoadingSpinner from "../../../utilities/LoadingSpinner";
import useEmployeesData from "../../../utilities/dataFetches/useAllEmployeesData";
import useTitle from "../../../utilities/useTitle";

import EmployeeInfoTable from "./EmployeeInfoTable";
import MultipleInputFilters from "../../reports/reports_utility_components/MultipleEmploymentAndDurationFilters";
import getDatesForDuration from "../../../utilities/CalculateUtils/useGetDatesForDuration";

const AllEmployeeList = () => {
  useTitle("All Employees List");

  const { allEmployeesFullInfo, loading, error } = useEmployeesData();

  // Set up states for each filter
  const [filterID, setFilterID] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterDesignation, setFilterDesignation] = useState("");
  const [filterJobLocation, setFilterJobLocation] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Helper function to filter employees by joining date
  const filterByJoiningDate = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return allEmployeesFullInfo?.filter((employee) => {
      const joiningDate = new Date(employee?.employment_info?.joining_date);
      return joiningDate >= start && joiningDate <= end;
    });
  };

  // Get startDate and endDate for selected duration and year
  const { startDate, endDate } = getDatesForDuration(
    selectedDuration,
    selectedYear
  );

  // Filter employees based on joining date and other filters
  const filteredEmployees = filterByJoiningDate(startDate, endDate)?.filter(
    (employee) => {
      const employee_id = employee?.employee_id;
      const name = employee?.personal_info?.name?.toLowerCase() || "";
      const designation =
        employee?.employment_info?.designation?.toLowerCase() || "";
      const department =
        employee?.employment_info?.department?.toLowerCase() || "";
      const jobLocation =
        employee?.employment_info?.job_location?.toLowerCase() || "";

      // Apply filters
      return (
        (filterID ? employee_id.toString() === filterID : true) &&
        name.includes(filterName.toLowerCase()) &&
        designation.includes(filterDesignation.toLowerCase()) &&
        department.includes(filterDepartment.toLowerCase()) &&
        jobLocation.includes(filterJobLocation.toLowerCase())
      );
    }
  );

  // console.log(filteredEmployees);

  return (
    <div className="container mx-auto px-2 sm:px-0 mt-16 mb-10">
      <h2 className="text-center text-2xl font-semibold leading-8 my-10">
        <span className="text-gradient">
          All ({filteredEmployees?.length}) Employee
        </span>{" "}
        Info
      </h2>

      <div className="w-full mx-auto px-5 my-10">
        {/* Display error messages */}
        {error && (
          <div className="mt-6 text-center text-base text-red-600">{error}</div>
        )}

        {/* Use CustomMultipleFilters for filtering */}
        <MultipleInputFilters
          // for ID filtering
          filterID={filterID}
          setFilterID={setFilterID}
          // for name filtering
          filterName={filterName}
          setFilterName={setFilterName}
          // for description filtering
          filterDepartment={filterDepartment}
          setFilterDepartment={setFilterDepartment}
          // for designation filtering
          filterDesignation={filterDesignation}
          setFilterDesignation={setFilterDesignation}
          // for job location filtering
          filterJobLocation={filterJobLocation}
          setFilterJobLocation={setFilterJobLocation}
          // for month & duration filtering
          selectedDuration={selectedDuration}
          setSelectedDuration={setSelectedDuration}
          // for year filtering
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="my-5">
            <EmployeeInfoTable
              filteredEmployees={filteredEmployees}
              reportType="all_employees"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEmployeeList;
