import PropTypes from "prop-types";
import { useState } from "react";

const EntryLeaveTable = ({ filteredEmployees, onLeaveModalClick }) => {
  // for pagination implementations
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const currentEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // to handle next & prev btn
  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrevPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  // function to set the items per page dynamically as the user wants
  const handleItemsPerPageChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page after changing items per page
  };

  // Helper function to format date into dd-mm-yyy form
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  return (
    <div>
      <div className="my-6 flex justify-end mx-2 sm:mr-10">
        <label>
          Items per page:
          <input
            type="number"
            min="1"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="ml-2 p-1 border rounded w-20"
          />
        </label>
      </div>

      <div className="overflow-x-auto w-11/12 mx-auto">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th className="border border-gray-300">ID</th>
              <td className="border border-gray-300">Status</td>
              <td className="border border-gray-300">Name</td>
              <td className="border border-gray-300">Designation</td>
              <td className="border border-gray-300">Department</td>
              <td className="border border-gray-300">Location</td>

              <td className="border border-gray-300">Joining Date</td>
              <td className="border border-gray-300">
                Probation <br /> (months)
              </td>
              <td className="border border-gray-300">Is_confirmed</td>

              <td className="border border-gray-300">
                Sick <br /> leave <br /> balance
              </td>
              <td className="border border-gray-300">
                Casual <br /> leave <br /> balance
              </td>

              <td className="border border-gray-300">Permanent Address</td>
              <td className="border border-gray-300">Present Address</td>

              <td className="border border-gray-300">
                Job Profile Details of The Employee Describing The Full History
                of The Employee During His Employment
              </td>
              <th className="border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees?.map((employee, index) => (
              <tr
                key={employee?.employee_id}
                // here, length - 1 is used not to apply bottom border for the very last line of the table
                className={`hover ${
                  index < currentEmployees.length - 1
                    ? "border-b-2 border-indigo-300"
                    : ""
                }`}
              >
                <th className="border border-gray-300">
                  {employee?.employee_id}
                </th>
                <td className="border border-gray-300">
                  {employee?.employment_info?.status}
                </td>
                <td className="border border-gray-300">
                  {employee?.personal_info?.name}
                </td>
                <td className="border border-gray-300">
                  {employee?.employment_info?.designation}
                </td>
                <td className="border border-gray-300">
                  {employee?.employment_info?.department}
                </td>
                <td className="border border-gray-300">
                  {employee?.employment_info?.job_location}
                </td>

                <td className="border border-gray-300">
                  {formatDate(employee?.employment_info?.joining_date)}
                </td>
                <td className="border border-gray-300">
                  {employee?.employment_info?.probation_period_months}
                </td>
                <td className="border border-gray-300">
                  {employee?.employment_info?.is_confirmed ? "Yes" : "No"}
                </td>

                <td className="border border-gray-300">
                  {employee?.salary_info?.sick_leave_balance}
                </td>
                <td className="border border-gray-300">
                  {employee?.salary_info?.casual_leave_balance}
                </td>

                <td className="border border-gray-300">
                  {employee?.personal_info?.permanent_address}
                </td>
                <td className="border border-gray-300">
                  {employee?.personal_info?.present_address}
                </td>

                <td className="border border-gray-300">
                  {employee?.job_profile_details}
                </td>
                <th className="border border-gray-300">
                  <button
                    className="btn btn-xs btn-outline btn-accent h-10"
                    onClick={() => onLeaveModalClick(employee)}
                  >
                    Process Leave_Info
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-4 sm:mt-8">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="btn-sm w-24 px-4 py-1 bg-indigo-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="mx-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="btn-sm w-24 px-4 py-1 bg-indigo-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

EntryLeaveTable.propTypes = {
  filteredEmployees: PropTypes.array.isRequired,
  onLeaveModalClick: PropTypes.func.isRequired,
};

export default EntryLeaveTable;
