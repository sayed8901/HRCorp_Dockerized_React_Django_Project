import PropTypes from "prop-types";
import { useState } from "react";
import LoadingSpinner from "../../../utilities/LoadingSpinner";

const SeparationModal = ({
  isOpen,
  onClose,
  onSeparate,
  employee,
  isProcessing,
  error,
}) => {
  const [formData, setFormData] = useState({
    cause_of_separation: "",
    application_submission_date: "",
    separation_effect_date: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data for submission
    const finalData = {
      cause_of_separation: formData.cause_of_separation,
      application_submission_date: formData.application_submission_date,
      separation_effect_date: formData.separation_effect_date,
    };

    console.log(finalData);

    // Call the separation function with updated data
    onSeparate(employee.employee_id, finalData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-5/6 sm:w-2/3 max-w-md">
        <h2 className="text-xl mb-4 text-center">
          Separation for{" "}
          <span className="font-bold">{employee.personal_info.name}</span> (ID#
          {employee.employee_id})
        </h2>

        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 w-full">
            <label
              htmlFor="cause_of_separation"
              className="block text-sm font-medium leading-6"
            >
              Cause of Separation
            </label>
            <div className="mt-2">
              <select
                id="cause_of_separation"
                name="cause_of_separation"
                onChange={handleChange}
                value={formData.cause_of_separation}
                required
                className="block w-full rounded-md border-0 py-2 px-5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
              >
                <option value="" disabled>
                  Select cause of separation
                </option>
                <option value="Family problem">Family problem</option>
                <option value="Personal problem">Personal problem</option>
                <option value="Better opportunity">Better opportunity</option>
                <option value="Corruption">Corruption</option>
                <option value="Unauthorized absence">
                  Unauthorized absence
                </option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="application_submission_date"
              className="block text-sm font-medium text-gray-700"
            >
              Application Submission Date
            </label>
            <input
              type="date"
              id="application_submission_date"
              name="application_submission_date"
              value={formData.application_submission_date}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="separation_effect_date"
              className="block text-sm font-medium text-gray-700"
            >
              Separation Effective Date
            </label>
            <input
              type="date"
              id="separation_effect_date"
              name="separation_effect_date"
              value={formData.separation_effect_date}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mt-4 flex justify-around gap-4">
            <button
              type="button"
              disabled={isProcessing}
              className="ml-2 inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onClose}
            >
              Cancel Separation
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isProcessing ? <LoadingSpinner /> : "Confirm Separation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

SeparationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSeparate: PropTypes.func.isRequired,
  employee: PropTypes.object.isRequired,
  isProcessing: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default SeparationModal;
