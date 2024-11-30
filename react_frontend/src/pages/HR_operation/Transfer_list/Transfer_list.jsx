import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../utilities/LoadingSpinner";
import useFetch from "../../../utilities/dataFetches/useDataFetchHooks";
import useTitle from "../../../utilities/useTitle";

import TransferUpdateModal from "../Transfer_list/UpdateTransferModal";
import TransferTable from "./TransferListTable";

import MultipleEmploymentAndDurationFilters from "../../reports/reports_utility_components/MultipleEmploymentAndDurationFilters";
import getDatesForDuration from "../../../utilities/CalculateUtils/useGetDatesForDuration";

// Fetching all transfer data from the API
const TransferList = () => {
  useTitle("Transfer List");

  const navigate = useNavigate();

  const {
    data: all_transfers,
    error,
    loading,
  } = useFetch(`${import.meta.env.VITE_API_URL}/transfer/list/`);

  // State to manage current transfer data for modal, loading state, and error messages
  const [currentTransferData, setCurrentTransferData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [modalError, setModalError] = useState("");

  // State to store employee data
  const [employeeData, setEmployeeData] = useState({});

  // Filtering state
  const [filterID, setFilterID] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterDesignation, setFilterDesignation] = useState("");
  const [filterJobLocation, setFilterJobLocation] = useState("");

  // Duration filtering state
  const [selectedDuration, setSelectedDuration] = useState("this_month");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const token = localStorage.getItem("authToken");
  const user_type = localStorage.getItem("user_type");

  // Function to fetch personalData and employmentData based on employee_id
  const fetchPersonalAndEmploymentInfo = async (employee_id) => {
    try {
      const [personalResponse, employmentResponse] = await Promise.all([
        fetch(
          `${
            import.meta.env.VITE_API_URL
          }/employment/personal_info/?employee_id=${employee_id}`
        ),
        fetch(
          `${
            import.meta.env.VITE_API_URL
          }/employment/employment_info/?employee_id=${employee_id}`
        ),
      ]);

      if (!personalResponse.ok || !employmentResponse.ok) {
        throw new Error("Failed to fetch employee info.");
      }

      const personalData = await personalResponse.json();
      const employmentData = await employmentResponse.json();

      return {
        personalData: personalData || {},
        employmentData: employmentData || {},
      };
    } catch (error) {
      console.error(`Error fetching data for employee ${employee_id}:`, error);
      return {
        personalData: {},
        employmentData: {},
      }; // Fallback in case of error
    }
  };

  // Fetch the personal & employment data for each employee in the transfer list
  useEffect(() => {
    if (all_transfers) {
      all_transfers.forEach(async (transfer) => {
        const { employee } = transfer;
        const data = await fetchPersonalAndEmploymentInfo(employee);

        setEmployeeData((prev) => ({
          ...prev,
          [employee]: data, // Store data for each employee
        }));
      });
    }
  }, [all_transfers]);

  // Filter employees based on selected duration
  const { startDate, endDate } = getDatesForDuration(
    selectedDuration,
    selectedYear
  );

  // Function to filter transfers based on criteria
  const filteredTransfers = all_transfers?.filter((transfer) => {
    const employee_id = transfer?.employee;
    const employeeInfo = employeeData[employee_id] || {};

    const name = employeeInfo?.personalData?.name?.toLowerCase() || "";
    const designation =
      employeeInfo?.employmentData?.designation?.toLowerCase() || "";
    const department =
      employeeInfo?.employmentData?.department?.toLowerCase() || "";
    const jobLocation =
      employeeInfo?.employmentData?.job_location?.toLowerCase() || "";

    // Apply filters and date range
    const transferEffectiveDate = new Date(transfer?.transfer_effective_date);
    const start = new Date(startDate);
    const end = new Date(endDate);

    return (
      (filterID ? employee_id.toString() === filterID : true) &&
      name.includes(filterName.toLowerCase()) &&
      designation.includes(filterDesignation.toLowerCase()) &&
      department.includes(filterDepartment.toLowerCase()) &&
      jobLocation.includes(filterJobLocation.toLowerCase()) &&
      transferEffectiveDate >= start &&
      transferEffectiveDate <= end
    );
  });

  // console.log(filteredTransfers);

  const handleOpenTransferUpdateModal = (transferData) => {
    setCurrentTransferData(transferData);
    setModalError(""); // Clear any previous errors when opening the modal
    setIsModalOpen(true);
  };

  const handleCloseTransferUpdateModal = () => {
    setIsModalOpen(false);
    setCurrentTransferData(null);
  };

  // function to update the transfer information via API call
  const handleUpdateTransfer = async (
    employee_id,
    transfer_id,
    transferData
  ) => {
    // console.log("Update transfer btn clicked");

    setIsProcessing(true);
    setModalError(""); // Clear any previous errors

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/transfer/update/?employee_id=${employee_id}&transfer_id=${transfer_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(transferData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to update transfer info.");
      }

      // Show success toast message
      toast.success("Transfer info successfully updated!");

      // Delay page refresh to allow toast to be shown
      setTimeout(() => {
        navigate(0); // refresh the current page
      }, 1000); // Adjust delay as needed
    } catch (error) {
      setModalError(
        error.message || "An error occurred while updating the transfer."
      );
      toast.error("Failed to update transfer info."); // Show error toast message
    } finally {
      setIsProcessing(false);
      handleCloseTransferUpdateModal(); // Close the modal after processing
    }
  };

  // function to cancel the transfer via API call
  const handleWithdrawTransfer = async (employee_id, transfer_id) => {
    // console.log("Withdraw transfer btn clicked");

    setIsProcessing(true);

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/transfer/cancel/?employee_id=${employee_id}&transfer_id=${transfer_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to withdraw transfer.");
      }

      // Show success toast message
      toast.success("Transfer has been cancelled successfully!");

      // Delay page refresh to allow toast to be shown
      setTimeout(() => {
        navigate(0);
      }, 1000); // Adjust delay as needed
    } catch (error) {
      toast.error(`Failed to withdraw transfer. occurred error: ${error}`); // Show error toast message
    } finally {
      setIsProcessing(false);
    }
  };

  // Helper function to check if transfer effective date is already gone or not
  const isTransferNotOutdated = (transferEffectiveDate) => {
    const effectiveDate = new Date(transferEffectiveDate);
    const currentDate = new Date();
    return effectiveDate >= currentDate;
  };

  return (
    <div className="container mx-auto px-2 sm:px-0 mt-16 mb-10">
      <div className="w-full mx-auto px-5 my-10">
        <div className="px-4 sm:px-0">
          <h2 className="text-center text-3xl font-semibold leading-8 mb-10">
            <span className="text-gradient">All Transfer</span> List
          </h2>
        </div>

        {/* Filter fields */}
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

        {/* to show loading spinner while loading */}
        {loading && <LoadingSpinner />}

        {/* showing error messages */}
        {error && (
          <div className="mt-6 text-center text-base text-red-600">{error}</div>
        )}

        {/* transfer list table */}
        <TransferTable
          filteredTransfers={filteredTransfers}
          employeeData={employeeData}
          user_type={user_type}
          handleOpenTransferUpdateModal={handleOpenTransferUpdateModal}
          handleWithdrawTransfer={handleWithdrawTransfer}
          isTransferNotOutdated={isTransferNotOutdated}
          all_transfers={all_transfers}
        />

        <TransferUpdateModal
          isOpen={isModalOpen}
          isProcessing={isProcessing}
          error={modalError}
          transferData={currentTransferData}
          onUpdateTransfer={handleUpdateTransfer}
          onClose={handleCloseTransferUpdateModal}
        />
      </div>
    </div>
  );
};

export default TransferList;
