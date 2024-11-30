import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import LoadingSpinner from "../../../utilities/LoadingSpinner";

const PromotionModal = ({
  isOpen,
  onClose,
  onPromote,
  employee,
  isProcessing,
  error,
}) => {
  const [designations, setDesignations] = useState([]);

  useEffect(() => {
    // Fetch designations for the dropdown
    fetch(`${import.meta.env.VITE_API_URL}/employment/designations/`)
      .then((res) => res.json())
      .then((data) => setDesignations(data))
      .catch((err) => console.log("Error fetching designations:", err));
  }, []);

  const [formData, setConfirmationData] = useState({
    promoted_to_designation: "",
    promoted_salary_grade: "",
    promoted_salary_step: "",
    promotion_effective_date: "",
  });

  const handleChange = (e) => {
    setConfirmationData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data for submission
    const finalData = {
      promoted_to_designation: formData.promoted_to_designation,
      promoted_salary_grade: formData.promoted_salary_grade,
      promoted_salary_step: formData.promoted_salary_step,
      promotion_effective_date: formData.promotion_effective_date,
    };

    console.log(finalData);

    // Call the confirmation function with updated data
    onPromote(employee.employee_id, finalData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-5/6 sm:w-2/3 max-w-md">
        <h2 className="text-xl mb-4 text-center">
          Promote{" "}
          <span className="font-bold">{employee.personal_info.name}</span> (ID#
          {employee.employee_id})
        </h2>

        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="">
            <div className="mb-4 sm:col-span-4">
              <label
                htmlFor="promoted_to_designation"
                className="block text-sm font-medium text-gray-700"
              >
                Promoted to (Designation)
              </label>
              <div>
                <select
                  id="promoted_to_designation"
                  name="promoted_to_designation"
                  value={formData.promoted_to_designation}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-5 py-2"
                >
                  <option value="" disabled>
                    Select Designation
                  </option>
                  {designations.map((designation) => (
                    <option key={designation.id} value={designation.id}>
                      {designation.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-8 gap-4">
              <div className="mb-4 sm:col-span-4">
                <label
                  htmlFor="promoted_salary_grade"
                  className="block text-sm font-medium leading-6"
                >
                  Promoted Grade
                </label>
                <div className="mt-2">
                  <select
                    id="promoted_salary_grade"
                    name="promoted_salary_grade"
                    onChange={handleChange}
                    value={formData.promoted_salary_grade}
                    required
                    className="block w-full rounded-md border-0 py-2 px-5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 bg-white"
                  >
                    <option value="" disabled>
                      Select salary grade
                    </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                  </select>
                </div>
              </div>

              <div className="mb-4 sm:col-span-4">
                <label
                  htmlFor="promoted_salary_step"
                  className="block text-sm font-medium leading-6"
                >
                  Promoted Step
                </label>
                <div className="mt-2">
                  <select
                    id="promoted_salary_step"
                    name="promoted_salary_step"
                    onChange={handleChange}
                    value={formData.promoted_salary_step}
                    required
                    className="block w-full rounded-md border-0 py-2 px-5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 bg-white"
                  >
                    <option value="" disabled>
                      Select salary step
                    </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-8 gap-4">
              <div className="mb-4 sm:col-span-8">
                <label
                  htmlFor="promotion_effective_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Promotion Effective Date
                </label>
                <input
                  type="date"
                  id="promotion_effective_date"
                  name="promotion_effective_date"
                  value={formData.promotion_effective_date}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-5 py-2"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-around gap-4">
            <button
              type="button"
              disabled={isProcessing}
              className="ml-2 inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onClose}
            >
              Cancel Promotion
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isProcessing ? <LoadingSpinner /> : "Confirm Promotion"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

PromotionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onPromote: PropTypes.func.isRequired,
  employee: PropTypes.object.isRequired,
  isProcessing: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default PromotionModal;
