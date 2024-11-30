import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import LoadingSpinner from "../../../utilities/LoadingSpinner";

const JobConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  employee,
  isProcessing,
  error,
}) => {
  const [designations, setDesignations] = useState([]);
  const [formData, setConfirmationData] = useState({
    confirmed_designation: "",
    confirmed_grade: "",
    confirmed_step: "",
    confirmation_effective_date: "",
  });

  useEffect(() => {
    // Fetch designations for the dropdown
    fetch(`${import.meta.env.VITE_API_URL}/employment/designations/`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setDesignations(data);
      })
      .catch((err) => console.log("Error fetching designations:", err));
  }, []);

  // Function to get the designation ID by using designation name
  const getDesignationIdByName = (name) => {
    const designation = designations.find((post) => post.name === name);
    return designation ? designation.id : "";
  };

  // Function to get the designation name by using designation ID
  // it is needed because, we need to sent the designation id for API POST requests
  const getDesignationName = (id) => {
    const designation = designations.find((post) => post.id === id);
    return designation ? designation.name : "";
  };

  // Initialize formData when the modal is opened or employee data changes
  useEffect(() => {
    if (isOpen && employee) {
      setConfirmationData({
        confirmed_designation: getDesignationIdByName(
          employee?.employment_info?.designation
        ),
        confirmed_grade: employee?.salary_info?.salary_grade || "",
        confirmed_step: employee?.salary_info?.salary_step || "",
        confirmation_effective_date:
          employee?.employment_info?.tentative_confirmation_date || "",
      });
    }
  }, [isOpen, employee, designations]);

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
      confirmed_designation: formData.confirmed_designation,
      confirmed_grade: formData.confirmed_grade,
      confirmed_step: formData.confirmed_step,
      confirmation_effective_date: formData.confirmation_effective_date,
    };

    console.log(finalData);

    // Call the confirmation function with updated data
    onConfirm(employee.employee_id, finalData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-5/6 sm:w-2/3 max-w-md">
        <h2 className="text-xl mb-4 text-center">
          Confirm{" "}
          <span className="font-bold">{employee.personal_info.name}</span> (ID#
          {employee.employee_id})
        </h2>

        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="">
            <div className="mb-4 col-span-4">
              <label
                htmlFor="confirmed_designation"
                className="block text-sm font-medium leading-6"
              >
                Confirmed Designation
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="confirmed_designation"
                  id="confirmed_designation"
                  value={getDesignationName(formData.confirmed_designation)}
                  disabled
                  className="block w-full rounded-md border-0 py-2 px-5 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-8 gap-4">
              <div className="mb-4 sm:col-span-4">
                <label
                  htmlFor="confirmed_grade"
                  className="block text-sm font-medium leading-6"
                >
                  Salary Grade
                </label>
                <div className="mt-2">
                  <select
                    id="confirmed_grade"
                    name="confirmed_grade"
                    onChange={handleChange}
                    value={formData.confirmed_grade}
                    required
                    className="block w-full rounded-md border-0 py-2 px-5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 bg-white"
                  >
                    <option value="" disabled>
                      Select a grade
                    </option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4 sm:col-span-4">
                <label
                  htmlFor="confirmed_step"
                  className="block text-sm font-medium leading-6"
                >
                  Confirmed Step
                </label>
                <div className="mt-2">
                  <select
                    id="confirmed_step"
                    name="confirmed_step"
                    onChange={handleChange}
                    value={formData.confirmed_step}
                    required
                    className="block w-full rounded-md border-0 py-2 px-5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 bg-white"
                  >
                    <option value="" disabled>
                      Select a step
                    </option>
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-8 gap-4">
              <div className="mb-4 sm:col-span-8">
                <label
                  htmlFor="confirmation_effective_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirmation Effective Date
                </label>
                <input
                  type="date"
                  id="confirmation_effective_date"
                  name="confirmation_effective_date"
                  value={formData.confirmation_effective_date}
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
              Cancel Job Confirmation
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isProcessing ? <LoadingSpinner /> : "Make Job Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

JobConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  employee: PropTypes.object.isRequired,
  isProcessing: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default JobConfirmationModal;
