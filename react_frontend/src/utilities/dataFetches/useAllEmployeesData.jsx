import { useState, useEffect } from "react";

const useEmployeesData = () => {
  const [allEmployeesFullInfo, setAllEmployeesFullInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define an async function to fetch data
    const fetchAllEmployeesData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/employee/all-info/`
        );

        // Check if the response is okay (status code in the range 200-299)
        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }

        const employeesData = await response.json();

        setAllEmployeesFullInfo(employeesData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEmployeesData();
  }, []);

  // Filter for active employees
  const allActiveEmployeesInfo = allEmployeesFullInfo.filter(
    (employee) => employee?.employment_info?.status === "Active"
  );

  if (loading)
    return {
      allEmployeesFullInfo: [],
      allActiveEmployeesInfo: [],
      loading: true,
      error: null,
    };

  if (error)
    return {
      allEmployeesFullInfo: [],
      allActiveEmployeesInfo: [],
      loading: false,
      error,
    };

  // Return the employee data
  return {
    allEmployeesFullInfo,
    allActiveEmployeesInfo,
    loading,
    error,
  };
};

export default useEmployeesData;
