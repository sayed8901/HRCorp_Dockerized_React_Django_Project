// Function to calculate the counts of employees by department, designation, and job location
const calculateCounts = (employee) => {
  // Objects to hold the counts for each department, designation, and job location
  const departmentCount = {};
  const designationCount = {};
  const jobLocationCount = {};

  // Iterate through the filtered list of staff members (employees)
  employee.forEach((employee) => {
    // Retrieve department, designation, and job location from employee's employment info
    // If any field is missing or undefined, use "Unknown" as a default value
    const department = employee.employment_info.department || "Unknown";
    const designation = employee.employment_info.designation || "Unknown";
    const jobLocation = employee.employment_info.job_location || "Unknown";

    // Increment the count for the current department
    departmentCount[department] = (departmentCount[department] || 0) + 1;
    // Increment the count for the current designation
    designationCount[designation] = (designationCount[designation] || 0) + 1;
    // Increment the count for the current job location
    jobLocationCount[jobLocation] = (jobLocationCount[jobLocation] || 0) + 1;
  });

  // Return the objects containing the counts for each category
  return { departmentCount, designationCount, jobLocationCount };
};

export default calculateCounts;
