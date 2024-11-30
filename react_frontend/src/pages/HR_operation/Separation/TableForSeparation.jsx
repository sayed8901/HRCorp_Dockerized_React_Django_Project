import PropTypes from "prop-types";
import { useState } from "react";

const TableForSeparation = ({ filteredEmployees, onSeparationModalClick }) => {
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
                Tentative Confirmation Date
              </td>
              <td className="border border-gray-300">Is Confirmed</td>
              <td className="border border-gray-300">
                Confirmation Effective Date
              </td>
              <td className="border border-gray-300">Last Promotion Date</td>

              <td className="border border-gray-300">Separation Type</td>
              <td className="border border-gray-300">Cause of Separation</td>
              <td className="border border-gray-300">
                Separation Application Date
              </td>
              <td className="border border-gray-300">
                Separation Effective Date
              </td>

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
                  {formatDate(
                    employee?.employment_info?.tentative_confirmation_date
                  )}
                </td>
                <td className="border border-gray-300">
                  {employee?.salary_info?.is_confirmed ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300">
                  {formatDate(
                    employee?.employment_info?.confirmation_effective_date
                  )}
                </td>
                <td className="border border-gray-300">
                  {formatDate(
                    employee?.last_promotion?.promotion_effective_date
                  )}
                </td>

                <td className="border border-gray-300">
                  {employee?.separation_info?.separation_type}
                </td>
                <td className="border border-gray-300">
                  {employee?.separation_info?.cause_of_separation}
                </td>
                <td className="border border-gray-300">
                  {formatDate(
                    employee?.separation_info?.application_submission_date
                  )}
                </td>
                <td className="border border-gray-300">
                  {formatDate(
                    employee?.separation_info?.separation_effect_date
                  )}
                </td>

                <td className="border border-gray-300">
                  {employee?.job_profile_details}
                </td>
                <th className="border border-gray-300">
                  <button
                    className="btn btn-xs btn-outline btn-accent h-10"
                    onClick={() => onSeparationModalClick(employee)}
                  >
                    Separate
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

TableForSeparation.propTypes = {
  filteredEmployees: PropTypes.array.isRequired,
  onSeparationModalClick: PropTypes.func.isRequired,
};

export default TableForSeparation;
