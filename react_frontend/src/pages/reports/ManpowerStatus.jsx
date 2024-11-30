import useEmployeesData from "../../utilities/dataFetches/useAllEmployeesData";
import LoadingSpinner from "../../utilities/LoadingSpinner";
import calculateCounts from "../../utilities/CalculateUtils/employeeCalculateCounts";
import StatisticsCard from "./reports_utility_components/StatisticsCard";
import useTitle from "../../utilities/useTitle";

const ManpowerStatus = () => {
  useTitle("Manpower Status");

  const { allActiveEmployeesInfo, loading, error } = useEmployeesData();
  //   console.log(allActiveEmployeesInfo);

  /* to show loading spinner while loading */
  if (loading) {
    return (
      <div className="my-32">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  /* showing error messages */
  {
    error && (
      <div className="mt-6 text-center text-base text-red-600">{error}</div>
    );
  }

  // Destructure the returned counts from the function to use them separately
  const { departmentCount, designationCount, jobLocationCount } =
    calculateCounts(allActiveEmployeesInfo);

  return (
    <div className="mt-16 mb-10 mx-10">
      <div className="sm:mx-auto">
        <h2 className="my-10 text-center text-2xl font-semibold leading-9 tracking-tight">
          Existing Active <span className="text-gradient">Manpower Status</span>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row w-full">
        {/* Section for Departments */}
        <StatisticsCard
          title="Employees by Department"
          data={departmentCount}
        />
        <div className="divider divider-horizontal"></div>

        {/* Section for Designations */}
        <StatisticsCard
          title="Employees by Designation"
          data={designationCount}
        />

        <div className="divider divider-horizontal"></div>

        {/* Section for Job Locations */}
        <StatisticsCard
          title="Employees by Job Location"
          data={jobLocationCount}
        />
      </div>
    </div>
  );
};

export default ManpowerStatus;
