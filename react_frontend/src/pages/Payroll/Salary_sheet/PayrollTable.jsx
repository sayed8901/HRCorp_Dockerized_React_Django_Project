import PropTypes from "prop-types";

// For PDF download
import jsPDF from "jspdf";
import "jspdf-autotable";

// For Excel download
import * as XLSX from "xlsx";
import { useState } from "react";

const PayrollTable = ({ allEmployeePayrollData }) => {
  // Helper object to format employee data for reuse in PDF or Excel files
  const formatEmployeeData = (employee) => ({
    "Employee ID": employee?.employee,
    Name: employee?.employee_name,
    Designation: employee?.designation,
    Department: employee?.department,
    "Job Location": employee?.job_location,
    Status: employee?.status,
    "Joining Date": employee?.joining_date,
    "Salary Grade": employee?.salary_grade,
    "Salary Step": employee?.salary_step,
    "Starting Basic": employee?.starting_basic,
    "Effective Basic": employee?.effective_basic,
    "House Rent": employee?.house_rent,
    "Medical Allowance": employee?.medical_allowance,
    Conveyance: employee?.conveyance,
    Hardship: employee?.hardship,
    "PF Contribution": employee?.pf_contribution,
    "Festival Bonus": employee?.festival_bonus,
    "Other Allowance": employee?.other_allowance,
    "Gross Salary": employee?.gross_salary,
    "PF Deduction": employee?.pf_deduction,
    "SWF Deduction": employee?.swf_deduction,
    "Tax Deduction": employee?.tax_deduction,
    "Late Joining Deduction": employee?.late_joining_deduction,
    "NPL Salary Deduction": employee?.npl_salary_deduction,
    "Net Salary": employee?.net_salary,
    "Is Confirmed": employee?.is_confirmed ? "Yes" : "No",
  });

  // Helper function to get the current month and year
  const getCurrentMonthYear = () => {
    const date = new Date();
    const options = { month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options).replace(" ", "-");
  };

  const monthYear = getCurrentMonthYear(); // e.g., "September-2024"

  // PDF download
  const downloadPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });

    const headers = [
      [
        "Employee ID",
        "Name",
        "Designation",
        "Department",
        "Job Location",
        "Status",
        "Joining Date",
        "Salary Grade",
        "Salary Step",
        "Starting Basic",
        "Effective Basic",
        "House Rent",
        "Medical Allowance",
        "Conveyance",
        "Hardship",
        "PF Contribution",
        "Festival Bonus",
        "Other Allowance",
        "Gross Salary",
        "PF Deduction",
        "SWF Deduction",
        "Tax Deduction",
        "Late Joining Deduction",
        "NPL Salary Deduction",
        "Net Salary",
        "Is Confirmed",
      ],
    ];

    // Rows of PDF file
    const rows = allEmployeePayrollData.map((employee) =>
      Object.values(formatEmployeeData(employee))
    );

    // Use the monthYear variable to dynamically set the title
    doc.text(`Payroll Data - ${monthYear}`, 14, 20); // 14, 20 is to set the page margins or positioning (X, Y coordinates)

    doc.autoTable({
      head: headers,
      body: rows,
      theme: "grid",
      styles: { fontSize: 8 },
      startY: 30,
    });

    // Use monthYear in the filename for the PDF
    doc.save(`payroll-data-${monthYear}.pdf`);
  };

  // Excel download
  const downloadExcel = () => {
    // Create a new workbook and a worksheet
    const ws = XLSX.utils.json_to_sheet(
      allEmployeePayrollData.map(formatEmployeeData)
    ); // Create a new worksheet

    const wb = XLSX.utils.book_new(); // Create a new workbook for Excel download

    XLSX.utils.book_append_sheet(wb, ws, `Payroll Data - ${monthYear}`); // Append the worksheet to the workbook

    // Use monthYear in the filename for the Excel file
    XLSX.writeFile(wb, `payroll-data-${monthYear}.xlsx`);
  };

  // for pagination implementations
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page

  const totalPages = Math.ceil(allEmployeePayrollData.length / itemsPerPage);

  const currentEmployees = allEmployeePayrollData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // to handle next & prev btn
  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrevPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  // function to set the items per page dynamically as the user wants
  const handleItemsPerPageChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page after changing items per page
  };

  return (
    <div>
      <div className="flex justify-between items-center gap-6 my-4 mx-2 sm:mx-10 text-center">
        <div>
          <label>
            Items per page:
            <input
              type="number"
              min="1"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="ml-2 p-1 border rounded w-20"
            />
          </label>
        </div>

        <div>
          <button
            onClick={downloadPDF}
            className="btn-sm mr-2 px-4 py-2 bg-indigo-500 text-white rounded transition duration-300 hover:bg-indigo-600"
          >
            Download in PDF
          </button>
          <button
            onClick={downloadExcel}
            className="btn-sm px-4 py-2 bg-green-500 text-white rounded transition duration-300 hover:bg-green-600"
          >
            Download in Excel
          </button>
        </div>
      </div>

      <div className="overflow-x-auto w-11/12 mx-auto my-4">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              {Object.keys(formatEmployeeData({})).map((header, index) => (
                <td className="border border-gray-300" key={index}>
                  {header}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee, index) => (
              <tr
                key={employee.employee}
                className={`hover ${
                  index < currentEmployees.length - 1
                    ? "border-b-2 border-indigo-300"
                    : ""
                }`}
              >
                {Object.values(formatEmployeeData(employee)).map(
                  (value, index) => (
                    <td className="border border-gray-300" key={index}>
                      {value}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-4 sm:mt-8">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="btn-sm w-24 px-4 py-1 bg-indigo-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="mx-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="btn-sm w-24 px-4 py-1 bg-indigo-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Define propTypes for the PayrollTable component
PayrollTable.propTypes = {
  allEmployeePayrollData: PropTypes.array.isRequired,
};

export default PayrollTable;
