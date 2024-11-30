import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useEmployeesData from "../../../utilities/dataFetches/useAllEmployeesData";
import LoadingSpinner from "../../../utilities/LoadingSpinner";
import EmployeeDetailsTab from "./EmployeeDetailsTab";
import SampleKeyboardLayout from "../../../components/SampleKeyboardLayout";
import useTitle from "../../../utilities/useTitle";

const EmployeeDetails = () => {
  useTitle("Employee Details");

  // Retrieve employee ID from URL parameters
  const { employee_id: urlEmployeeId } = useParams();

  // State for the search input and submitted ID for searching employee details
  const [searchId, setSearchId] = useState(urlEmployeeId || "");
  const [submittedId, setSubmittedId] = useState("");

  const navigate = useNavigate();

  // Fetch all the employees full info data
  const {
    allEmployeesFullInfo,
    loading: employeeLoading,
    error: employeeError,
  } = useEmployeesData();

  // Triggered when the "Search" button is clicked
  const handleSearch = () => {
    // Check if the searchId is not empty
    if (searchId.trim()) {
      // Set submitted ID and navigate to the employee details page for the entered ID
      setSubmittedId(searchId);
      navigate(`/employee_details/${searchId}`);
    }
  };

  // Updates the search ID when a key from the SampleKeyboardLayout component is pressed
  const handleKeyPress = (num) => {
    // Append the number and limit the length to 4 digits
    setSearchId((prev) => (prev + num).slice(0, 4)); // Limit to 4 digits
  };

  // Allows searching by pressing Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Find the target employee by the submitted ID, or return null if not found
  const employee = allEmployeesFullInfo
    ? allEmployeesFullInfo.find((emp) => emp.employee_id === submittedId)
    : null;

  // Update search and submitted IDs when the URL parameter changes
  useEffect(() => {
    if (urlEmployeeId) {
      setSearchId(urlEmployeeId);
      setSubmittedId(urlEmployeeId);
    }
  }, [urlEmployeeId]);

  // Show loading spinner while data is being fetched
  if (employeeLoading)
    return (
      <div className="my-36">
        <LoadingSpinner />
      </div>
    );

  // Display an error message if there was an error in data fetching
  if (employeeError) {
    return (
      <div className="flex items-center justify-center my-28">
        <div className="text-center space-y-5">
          <h2 className="text-2xl font-semibold text-red-600">Error</h2>
          <p className="text-gray-700">
            There was an issue connecting to the server. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-0 mt-16 mb-10">
      <div className="w-full mx-auto px-5 my-10">
        <div className="px-4 sm:px-0">
          {/* Display employee's details heading if found, otherwise prompt for a search */}
          {submittedId && employee ? (
            <h2 className="text-center text-3xl font-semibold leading-8 mb-10">
              Employee Details for
              <span className="text-gradient">
                {employee.personal_info.first_name}{" "}
                {employee.personal_info.name} (ID#
                {employee.personal_info.employee})
              </span>
            </h2>
          ) : (
            <h2 className="text-center text-3xl font-semibold leading-8 mb-10">
              <span className="text-gradient">Search to view details </span>of
              an employee
            </h2>
          )}
        </div>

        {/* Input field and search button for employee ID */}
        <div className="flex items-center justify-center mb-12">
          <div className="join rounded-l-full">
            <input
              className="input input-bordered join-item"
              placeholder="Type 4 digit ID like: 0001"
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              onKeyDown={handleKeyDown} // Search on Enter key press
            />
            <button
              className="btn join-item rounded-r-full"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        {/* Display employee details if found, otherwise show a 'not found' message */}
        {submittedId ? (
          employee ? (
            <EmployeeDetailsTab employee_id={submittedId} />
          ) : (
            <div>
              <div className="flex items-center justify-center my-10">
                <div className="bg-red-100 text-red-600 p-4 rounded-md shadow-md">
                  <p className="text-lg sm:text-xl font-semibold text-center">
                    No employee found, Please type the employee ID carefully.
                  </p>
                </div>
              </div>

              {/* Render the custom keyboard layout to allow user input */}
              <SampleKeyboardLayout
                onKeyPress={handleKeyPress}
              ></SampleKeyboardLayout>
            </div>
          )
        ) : (
          // Render the sample keyboard layout when no search has been submitted
          <SampleKeyboardLayout
            onKeyPress={handleKeyPress}
          ></SampleKeyboardLayout>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetails;
