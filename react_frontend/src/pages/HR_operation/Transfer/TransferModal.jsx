import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import LoadingSpinner from "../../../utilities/LoadingSpinner";

const TransferModal = ({
  isOpen,
  onClose,
  onTransfer,
  employee,
  isProcessing,
  error,
}) => {
  const [departments, setDepartments] = useState([]);
  const [job_Locations, setJobLocation] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/employment/departments/`)
      .then((res) => res.json())
      .then((data) => {
        setDepartments(data);
      })
      .catch((err) => console.log("Error fetching departments:", err));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/employment/job_locations/`)
      .then((res) => res.json())
      .then((data) => {
        setJobLocation(data);
      })
      .catch((err) => console.log("Error fetching designations:", err));
  }, []);

  // declaring a initial state for transfer data
  const [formData, setTransferData] = useState({
    transfer_from_location: "",
    transfer_from_department: "",
    transfer_to_location: "",
    transfer_to_department: "",
    transfer_effective_date: "",
  });

  useEffect(() => {
    if (isOpen && employee) {
      setTransferData({
        transfer_from_location: employee?.employment_info?.job_location || "",
        transfer_from_department: employee?.employment_info?.department || "",
        transfer_to_location: "",
        transfer_to_department: "",
        transfer_effective_date: "",
      });
    }
  }, [isOpen, employee]);

  const handleChange = (e) => {
    setTransferData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // getting 'transfer_to_location' from modal form data
    const selectedToLocation = job_Locations.find(
      (location) => location.id === parseInt(formData.transfer_to_location)
    )?.name;

    // getting 'transfer_to_department' from modal form data
    const selectedToDepartment = departments.find(
      (department) =>
        department.id === parseInt(formData.transfer_to_department)
    )?.name;

    // preparing the final modal data to submit
    const finalData = {
      transfer_from_location: formData.transfer_from_location,
      transfer_from_department: formData.transfer_from_department,
      transfer_to_location: selectedToLocation || "",
      transfer_to_department: selectedToDepartment || "",
      transfer_effective_date: formData.transfer_effective_date,
    };

    console.log(finalData);

    // calling the handleTransfer function (in the Transfer.jsx) triggering from the transfer BTN to call the Transfer_Processing API method
    onTransfer(employee.employee_id, finalData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-5/6 sm:w-2/3 max-w-md">
        <h2 className="text-xl mb-4 text-center">
          Transfer{" "}
          <span className="font-bold">{employee.personal_info.name}</span> (ID#
          {employee.employee_id})
        </h2>

        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-8 gap-4">
            <div className="mb-4 sm:col-span-4">
              <label
                htmlFor="transfer_from_location"
                className="block text-sm font-medium text-gray-700"
              >
                Transfer From Location
              </label>
              <input
                type="text"
                id="transfer_from_location"
                name="transfer_from_location"
                value={formData.transfer_from_location}
                onChange={handleChange}
                disabled
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-5 py-2"
              />
            </div>

            <div className="mb-4 sm:col-span-4">
              <label
                htmlFor="transfer_to_location"
                className="block text-sm font-medium text-gray-700"
              >
                Transfer To Location
              </label>
              <div>
                <select
                  id="transfer_to_location"
                  name="transfer_to_location"
                  value={formData.transfer_to_location}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-5 py-2"
                >
                  <option value="" disabled>
                    Select job location
                  </option>
                  {job_Locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-8 gap-4">
            <div className="mb-4 sm:col-span-4">
              <label
                htmlFor="transfer_from_department"
                className="block text-sm font-medium text-gray-700"
              >
                Transfer From Department
              </label>
              <input
                type="text"
                id="transfer_from_department"
                name="transfer_from_department"
                value={formData.transfer_from_department}
                onChange={handleChange}
                disabled
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-5 py-2"
              />
            </div>

            <div className="mb-4 sm:col-span-4">
              <label
                htmlFor="transfer_to_department"
                className="block text-sm font-medium text-gray-700"
              >
                Transfer To Department
              </label>
              <div>
                <select
                  id="transfer_to_department"
                  name="transfer_to_department"
                  value={formData.transfer_to_department}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-5 py-2"
                >
                  <option value="" disabled>
                    Select department
                  </option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-8 gap-4">
            <div className="mb-4 sm:col-span-8">
              <label
                htmlFor="transfer_effective_date"
                className="block text-sm font-medium text-gray-700"
              >
                Transfer Effective Date
              </label>
              <input
                type="date"
                id="transfer_effective_date"
                name="transfer_effective_date"
                value={formData.transfer_effective_date}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-5 py-2"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-around gap-4">
            <button
              type="button"
              disabled={isProcessing}
              className="ml-2 inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onClose}
            >
              Cancel Transfer
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className={`inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isProcessing ? <LoadingSpinner /> : "Confirm Transfer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

TransferModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onTransfer: PropTypes.func.isRequired,
  employee: PropTypes.object,
  isProcessing: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default TransferModal;
