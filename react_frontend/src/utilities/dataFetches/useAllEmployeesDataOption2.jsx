import { useState, useEffect } from "react";

const useEmployeesData = () => {
  const [allEmployeesFullInfo, setAllEmployeesFullInfo] = useState([]);
  const [allPersonalInfo, setAllPersonalInfo] = useState([]);
  const [allEmploymentInfo, setAllEmploymentInfo] = useState([]);
  const [allSalaryInfo, setAllSalaryInfo] = useState([]);
  const [allJobProfileHistory, setAllJobProfileHistory] = useState([]);
  const [allPromotionInfo, setAllPromotionInfo] = useState([]);
  const [allSeparationInfo, setAllSeparationInfo] = useState([]);
  const [allTransferInfo, setAllTransferInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define an async function to fetch and combine data
    const fetchAndCombineData = async () => {
      try {
        // Fetch all employee IDs
        const employeesResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/employee/list/`
        );
        const employeeIDs = await employeesResponse.json();

        // Fetch personal info
        const personalInfoResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/employment/personal_info/list/`
        );
        const personalInfo = await personalInfoResponse.json();
        setAllPersonalInfo(personalInfo);

        // Fetch employment info
        const employmentInfoResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/employment/employment_info/list/`
        );
        const employmentInfo = await employmentInfoResponse.json();
        setAllEmploymentInfo(employmentInfo);

        // Fetch salary info
        const salaryInfoResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/salary/salary_info/list/`
        );
        const salaryInfo = await salaryInfoResponse.json();
        setAllSalaryInfo(salaryInfo);

        // Fetch promotion info
        const promotionInfoResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/promotion/list/`
        );
        const promotionInfo = await promotionInfoResponse.json();
        setAllPromotionInfo(promotionInfo);

        // Fetch job profile history
        const profileInfoResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/job_profile_history/list/`
        );
        const profileInfo = await profileInfoResponse.json();
        setAllJobProfileHistory(profileInfo);

        // Fetch separation info
        const separationInfoResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/separation/list/`
        );
        const separationInfo = await separationInfoResponse.json();
        setAllSeparationInfo(separationInfo);

        // Fetch transfer info
        const transferInfoResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/transfer/list/`
        );
        const transferInfo = await transferInfoResponse.json();
        setAllTransferInfo(transferInfo);

        // Combine data (via searching by employee_ID)
        const combinedData = employeeIDs.map((employee) => {
          // Personal information
          const personal =
            personalInfo.find(
              (info) => info.employee === employee.employee_id
            ) || {};

          // Employment information
          const employment =
            employmentInfo.find(
              (info) => info.employee === employee.employee_id
            ) || {};

          // Salary information
          const salary =
            salaryInfo.find((info) => info.employee === employee.employee_id) ||
            {};

          // Find the separation info for the employee
          const separation =
            separationInfo.find(
              (info) => info.employee === employee.employee_id
            ) || {};

          // Transfer info for the employee
          const transfers = transferInfo.filter(
            (info) => info.employee === employee.employee_id
          );

          // Aggregate details text from all job profile entries
          // Step 1: Filter job profile entries by employee ID
          const filteredProfileInfo = profileInfo.filter(
            (info) => info.employee === employee.employee_id
          );
          // Step 2: Add serial number to each profile detail
          const numberedProfileDetails = filteredProfileInfo.map(
            (info, index) => `**${index + 1}.** ${info.details}`
          );
          // Step 3: Combine all details with a comma separator
          const jobProfileDetails = numberedProfileDetails.join(" , ");

          // Find the last promotion based on 'promotion_effective_date'
          const lastPromotionInfo =
            promotionInfo
              .filter((info) => info.employee === employee.employee_id)
              .sort(
                (a, b) =>
                  new Date(b.promotion_effective_date) -
                  new Date(a.promotion_effective_date)
              )[0] || {};

          return {
            ...employee,
            personal_info: personal,
            employment_info: employment,
            salary_info: salary,
            job_profile_details: jobProfileDetails,
            last_promotion: lastPromotionInfo,
            separation_info: separation,
            transfer_info: transfers,
          };
        });

        setAllEmployeesFullInfo(combinedData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndCombineData();
  }, []);

  const allActiveEmployeesInfo = allEmployeesFullInfo.filter(
    (employee) => employee?.employment_info?.status === "Active"
  );

  if (loading)
    return {
      allEmployeesFullInfo: [],
      allActiveEmployeesInfo: [],
      allPersonalInfo: [],
      allEmploymentInfo: [],
      allSalaryInfo: [],
      allJobProfileHistory: [],
      allPromotionInfo: [],
      allSeparationInfo: [],
      allTransferInfo: [],
      loading: true,
      error: null,
    };
  if (error)
    return {
      allEmployeesFullInfo: [],
      allActiveEmployeesInfo: [],
      allPersonalInfo: [],
      allEmploymentInfo: [],
      allSalaryInfo: [],
      allJobProfileHistory: [],
      allPromotionInfo: [],
      allSeparationInfo: [],
      allTransferInfo: [],
      loading: false,
      error,
    };

  return {
    allEmployeesFullInfo,
    allActiveEmployeesInfo,
    allPersonalInfo,
    allEmploymentInfo,
    allSalaryInfo,
    allJobProfileHistory,
    allPromotionInfo,
    allSeparationInfo,
    allTransferInfo,
    loading,
    error,
  };
};

export default useEmployeesData;
