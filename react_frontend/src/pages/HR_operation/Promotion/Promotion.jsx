import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../utilities/LoadingSpinner";
import useEmployeesData from "../../../utilities/dataFetches/useAllEmployeesData";
import PromotionModal from "./PromotionModal";
import useTitle from "../../../utilities/useTitle";

import MultipleEmploymentAndDurationFilters from "../../reports/reports_utility_components/MultipleEmploymentAndDurationFilters";
import getDatesForDuration from "../../../utilities/CalculateUtils/useGetDatesForDuration";
import TableForPromotion from "./TableForPromotion";

const Promotion = () => {
  useTitle("Promotion");

  const navigate = useNavigate();

  const { allActiveEmployeesInfo, loading, error } = useEmployeesData();

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

    return allActiveEmployeesInfo?.filter((employee) => {
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

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [modalError, setModalError] = useState("");

  // for modal activity
  const handleOpenModal = async (employee) => {
    setSelectedEmployee(employee);
    setModalError(""); // Clear any previous errors when opening the modal
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const token = localStorage.getItem("authToken");

  const handlePromote = async (employee_id, promotionData) => {
    // console.log("promotion btn clicked");

    setIsProcessing(true);
    setModalError(""); // Clear any previous errors

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/promotion/promote/?employee_id=${employee_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(promotionData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || "Failed to make job promotion for the employee."
        );
      }

      // Show success toast message
      toast.success("Job promotion was successful!");

      // Delay page refresh to allow toast to be shown
      setTimeout(() => {
        navigate(0);
      }, 1000); // Adjust delay as needed
    } catch (error) {
      setModalError(
        error.message || "An error occurred while processing the job promotion."
      );
      toast.error("Failed to make job promotion for the employee."); // Show error toast message
    } finally {
      setIsProcessing(false);
      handleCloseModal(); // Close the modal after processing
    }
  };

  return (
    <div>
      <div className="container mx-auto px-2 sm:px-0 mt-16 mb-10">
        <div className="w-full mx-auto px-5 my-10">
          <div className="px-4 sm:px-0">
            <h2 className="w-full sm:w-1/2 mx-auto text-center text-3xl font-semibold leading-8 mb-10">
              <span className="text-gradient">
                All ({filteredEmployees?.length}) Active Employee
              </span>{" "}
              List
            </h2>
          </div>

          {/* Use CustomMultipleFilters for filtering */}
          <MultipleEmploymentAndDurationFilters
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
          ) : error ? (
            <p className="text-red-500">Error loading data</p>
          ) : (
            <div className="my-5">
              <TableForPromotion
                filteredEmployees={filteredEmployees}
                onPromotionModalClick={handleOpenModal}
              />
            </div>
          )}
        </div>

        {isModalOpen && (
          <PromotionModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onPromote={handlePromote}
            employee={selectedEmployee}
            isProcessing={isProcessing}
            error={modalError}
          />
        )}
      </div>
    </div>
  );
};

export default Promotion;
