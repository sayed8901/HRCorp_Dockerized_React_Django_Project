import PropTypes from "prop-types";
import { useState } from "react";
import LoadingSpinner from "../../../utilities/LoadingSpinner";

const EntryLeaveModal = ({
  isOpen,
  onClose,
  onLeaveEntry,
  employee,
  isProcessing,
  error,
}) => {
  const [formData, setFormData] = useState({
    leave_type: "",
    leave_start_date: "",
    leave_end_date: "",
  });

  const [modalError, setModalError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setModalError(""); // Clear any previous modal errors on change
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate the number of leave days
    const startDate = new Date(formData.leave_start_date);
    const endDate = new Date(formData.leave_end_date);
    const leaveDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1; // Add 1 to include both start and end date

    // Check leave balance and show error if necessary
    if (
      formData.leave_type === "Sick" &&
      leaveDays > employee.salary_info.sick_leave_balance
    ) {
      setModalError(
        `You cannot take more than ${employee.salary_info.sick_leave_balance} sick leave days.`
      );
      return; // Stop submission if the leave exceeds the balance
    }

    if (
      formData.leave_type === "Casual" &&
      leaveDays > employee.salary_info.casual_leave_balance
    ) {
      setModalError(
        `You cannot take more than ${employee.salary_info.casual_leave_balance} casual leave days.`
      );
      return; // Stop submission if the leave exceeds the balance
    }

    // preparing the final modal data to submit
    const finalData = {
      employee_id: employee.employee_id,
      leave_type: formData.leave_type,
      leave_start_date: formData.leave_start_date,
      leave_end_date: formData.leave_end_date,
    };

    console.log(finalData);

    // calling the handleLeaveEntry function (in the EntryLeave.jsx) triggering from the leave BTN to call the Entry_Leave_Processing API method
    onLeaveEntry(employee.employee_id, finalData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-5/6 sm:w-2/3 max-w-md">
        <h2 className="text-xl mb-4 text-center">
          Apply Leave for{" "}
          <span className="font-bold">{employee.personal_info.name}</span> (ID#
          {employee.employee_id})
        </h2>

        {/* leave error */}
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}
        {/* modal error */}
        {modalError && (
          <div className="text-red-600 text-center mb-4">{modalError}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="leave_type"
              className="block text-sm font-medium text-gray-700"
            >
              Leave Type
            </label>
            <select
              id="leave_type"
              name="leave_type"
              value={formData.leave_type}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-5 py-2"
            >
              <option value="" disabled>
                Select leave type
              </option>
              {employee?.salary_info?.sick_leave_balance > 0 && (
                <option>Sick</option>
              )}
              {employee?.salary_info?.casual_leave_balance > 0 && (
                <option>Casual</option>
              )}
              <option>Non_Paid_Leave</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="leave_start_date"
              className="block text-sm font-medium text-gray-700"
            >
              Leave Start Date
            </label>
            <input
              type="date"
              id="leave_start_date"
              name="leave_start_date"
              value={formData.leave_start_date}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-5 py-2"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="leave_end_date"
              className="block text-sm font-medium text-gray-700"
            >
              Leave End Date
            </label>
            <input
              type="date"
              id="leave_end_date"
              name="leave_end_date"
              value={formData.leave_end_date}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-5 py-2"
            />
          </div>

          <div className="mt-4 flex justify-around gap-4">
            <button
              type="button"
              className="ml-2 inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              disabled={isProcessing}
            >
              {isProcessing ? <LoadingSpinner /> : "Submit Leave"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EntryLeaveModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLeaveEntry: PropTypes.func.isRequired,
  employee: PropTypes.object,
  isProcessing: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default EntryLeaveModal;
