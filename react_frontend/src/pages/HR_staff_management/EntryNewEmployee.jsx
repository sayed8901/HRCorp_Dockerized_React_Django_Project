import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../utilities/LoadingSpinner";
import { toast } from "react-toastify";
import useTitle from "../../utilities/useTitle";

const EntryNewEmployee = () => {
  useTitle("Entry New Employee");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [departments, setDepartments] = useState([]);
  const [designations, setDesignation] = useState([]);
  const [job_Locations, setJobLocation] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/employment/departments/`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setDepartments(data);
      })
      .catch((err) => console.log("Error fetching departments:", err));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/employment/designations/`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setDesignation(data);
      })
      .catch((err) => console.log("Error fetching designations:", err));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/employment/job_locations/`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setJobLocation(data);
      })
      .catch((err) => console.log("Error fetching designations:", err));
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    father_name: "",
    mother_name: "",
    marital_status: "",
    spouse_name: "",

    permanent_address: "",
    present_address: "",
    date_of_birth: "",
    smart_id: "",
    contact_number: "",
    email: "",
    educational_degree: "",
    blood_group: "",

    job_location: "",
    designation: "",
    department: "",
    joining_date: "",
    probation_period_months: "",

    salary_grade: "",
    salary_step: "",
  });

  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error message
    setSuccessMessage(""); // Clear previous success message
    setIsLoading(true); // Show loading spinner

    const EmployeeData = {
      personal_info_data: {
        name: formData.name,
        gender: formData.gender,
        father_name: formData.father_name,
        mother_name: formData.mother_name,
        marital_status: formData.marital_status,
        spouse_name: formData.spouse_name,

        permanent_address: formData.permanent_address,
        present_address: formData.present_address,
        date_of_birth: formData.date_of_birth,
        smart_id: formData.smart_id,
        contact_number: formData.contact_number,
        email: formData.email,
        educational_degree: formData.educational_degree,
        blood_group: formData.blood_group,
      },

      employment_info_data: {
        job_location: formData.job_location,
        designation: formData.designation,
        department: formData.department,
        joining_date: formData.joining_date,
        probation_period_months: parseInt(formData.probation_period_months),
      },

      salary_info_data: {
        // converting into integer number
        salary_grade: parseInt(formData.salary_grade),
        salary_step: parseInt(formData.salary_step),
      },
    };

    console.log("formData", EmployeeData);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/employee/list/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(EmployeeData),
        }
      );
      const data = await response.json();
      console.log(data);

      if (response.status === 400) {
        // Display error message
        setErrorMessage(data.error);
      } else {
        // Show success toast
        toast.success("New employee data successfully added.");
        console.log(successMessage);
        navigate("/all_employee");
      }
    } catch (error) {
      // Display error message
      setErrorMessage("An error occurred. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="container mx-auto mb-10">
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-5/6 lg:w-2/3 mx-auto px-5 mb-10 pt-20"
      >
        <div className="space-y-12">
          {/* personal info */}
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-xl md:text-2xl font-bold leading-7 mb-12 text-center">
              <span className="text-gradient">Newly joined Employee</span> Entry
              Form
            </h2>

            <h2 className="text-base md:text-xl font-semibold leading-7  ">
              Personal Information
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-8">
              <div className="col-span-4 sm:col-span-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6  "
                >
                  Employee Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    className="block w-full rounded-md border-0 py-2 px-5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>

              <div className="col-span-4 sm:col-span-4">
                <label
                  htmlFor="date_of_birth"
                  className="block text-sm font-medium leading-6"
                >
                  Date of Birth
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="date_of_birth"
                    id="date_of_birth"
                    onChange={handleChange}
                    required
                    autoComplete="date_of_birth"
                    className="block w-full rounded-md border-0 py-2 px-5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="educational_degree"
                  className="block text-sm font-medium leading-6  "
                >
                  Education
                </label>
                <div className="mt-2">
                  <select
                    id="educational_degree"
                    name="educational_degree"
                    onChange={handleChange}
                    value={formData.educational_degree}
                    required
                    autoComplete="educational_degree"
                    className="block w-full rounded-md border-0 py-2 px-5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 bg-white"
                  >
                    <option value="" disabled>
                      Select Educational Degree
                    </option>
                    <option value="SSC">SSC</option>
                    <option value="Dakhil">Dakhil</option>
                    <option value="HSC">HSC</option>
                    <option value="Alim">Alim</option>
                    <option value="BBA">BBA</option>
                    <option value="BBS">BBS</option>
                    <option value="BSS">BSS</option>
                    <option value="BA">BA</option>
                    <option value="BSc">BSc</option>
                    <option value="Fadil">Fadil</option>
                    <option value="MBA">MBA</option>
                    <option value="MBS">MBS</option>
                    <option value="MSS">MSS</option>
                    <option value="MA">MA</option>
                    <option value="MSc">MSc</option>
                    <option value="Kamil">Kamil</option>
                    <option value="PostGraduate">PostGraduate</option>
                  </select>
                </div>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="blood_group"
                  className="block text-sm font-medium leading-6  "
                >
                  Blood Group
                </label>
                <div className="mt-2">
                  <select
                    id="blood_group"
                    name="blood_group"
                    onChange={handleChange}
                    value={formData.blood_group}
                    required
                    autoComplete="blood_group"
                    className="block w-full rounded-md border-0 py-2 px-5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 bg-white"
                  >
                    <option value="" disabled>
                      Select Blood Group
                    </option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              <div className="col-span-4 sm:col-span-4">
                <label
                  htmlFor="father_name"
                  className="block text-sm font-medium leading-6  "
                >
                  Father name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="father_name"
                    id="father_name"
                    onChange={handleChange}
                    required
                    autoComplete="father_name"
                    className="block w-full rounded-md border-0 py-2 px-5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>
              <div className="col-span-4 sm:col-span-4">
                <label
                  htmlFor="mother_name"
                  className="block text-sm font-medium leading-6  "
                >
                  Mother name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="mother_name"
                    id="mother_name"
                    onChange={handleChange}
                    required
                    autoComplete="mother_name"
                    className="block w-full rounded-md border-0 py-2 px-5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium leading-6  "
                >
                  Gender
                </label>
                <div className="mt-2">
                  <select
                    id="gender"
                    name="gender"
                    onChange={handleChange}
                    value={formData.gender}
                    required
                    autoComplete="gender"
                    className="block w-full rounded-md border-0 py-2 px-5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 bg-white"
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>
              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="marital_status"
                  className="block text-sm font-medium leading-6  "
                >
                  Marital Status
                </label>
                <div className="mt-2">
                  <select
                    id="marital_status"
                    name="marital_status"
                    onChange={handleChange}
                    value={formData.marital_status}
                    required
                    autoComplete="marital_status"
                    className="block w-full rounded-md border-0 py-2 px-5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 bg-white"
                  >
                    <option value="" disabled>
                      Select Marital Status
                    </option>
                    <option>Single</option>
                    <option>Married</option>
                    <option>Divorced</option>
                  </select>
                </div>
              </div>
              <div className="col-span-4 sm:col-span-4">
                <label
                  htmlFor="spouse_name"
                  className="block text-sm font-medium leading-6  "
                >
                  Spouse
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="spouse_name"
                    id="spouse_name"
                    autoComplete="spouse_name"
                    className="block w-full rounded-md border-0 py-2 px-5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>

              <div className="col-span-4 sm:col-span-4">
                <label
                  htmlFor="contact_number"
                  className="block text-sm font-medium leading-6  "
                >
                  Contact number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="contact_number"
                    id="contact_number"
                    onChange={handleChange}
                    required
                    autoComplete="contact_number"
                    className="block w-full rounded-md border-0 py-2 px-5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>
              <div className="col-span-4 sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6  "
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-2 px-5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>

              <div className="col-span-4 sm:col-span-full">
                <label
                  htmlFor="permanent_address"
                  className="block text-sm font-medium leading-6  "
                >
                  Permanent Address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="permanent_address"
                    id="permanent_address"
                    onChange={handleChange}
                    required
                    autoComplete="permanent_address"
                    className="block w-full rounded-md border-0 py-2 px-5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>
              <div className="col-span-4 sm:col-span-full">
                <label
                  htmlFor="present_address"
                  className="block text-sm font-medium leading-6  "
                >
                  Present Address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="present_address"
                    id="present_address"
                    onChange={handleChange}
                    required
                    autoComplete="present_address"
                    className="block w-full rounded-md border-0 py-2 px-5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>

              <div className="col-span-4 sm:col-span-4">
                <label
                  htmlFor="smart_id"
                  className="block text-sm font-medium leading-6  "
                >
                  Smart NID number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="smart_id"
                    id="smart_id"
                    onChange={handleChange}
                    required
                    autoComplete="smart_id"
                    className="block w-full rounded-md border-0 py-2 px-5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* employment info */}
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base md:text-xl font-semibold leading-7  ">
              Employment Information
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-8">
              <div className="sm:col-span-5">
                <label
                  htmlFor="joining_date"
                  className="block text-sm font-medium leading-6"
                >
                  Joining Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="joining_date"
                    id="joining_date"
                    onChange={handleChange}
                    required
                    autoComplete="joining_date"
                    className="block w-full rounded-md border-0 py-2 px-5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="probation_period_months"
                  className="block text-sm font-medium leading-6  "
                >
                  Probation period (in months)
                </label>
                <div className="mt-2">
                  <select
                    id="probation_period_months"
                    name="probation_period_months"
                    onChange={handleChange}
                    value={formData.probation_period_months}
                    required
                    autoComplete="marital_status"
                    className="block w-full rounded-md border-0 py-2 px-5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 bg-white"
                  >
                    <option value="" disabled>
                      Select probation period (month no)
                    </option>
                    <option>1</option>
                    <option>3</option>
                    <option>6</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="department"
                  className="block text-sm font-medium leading-6"
                >
                  Department
                </label>
                <div className="mt-2">
                  <select
                    id="department"
                    name="department"
                    required
                    value={formData.department}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-3 px-5  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  >
                    <option value="" disabled>
                      Select department
                    </option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="designation"
                  className="block text-sm font-medium leading-6"
                >
                  Designation
                </label>
                <div className="mt-2">
                  <select
                    id="designation"
                    name="designation"
                    required
                    value={formData.designation}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-3 px-5  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  >
                    <option value="" disabled>
                      Select designation
                    </option>
                    {designations.map((post) => (
                      <option key={post.id} value={post.id}>
                        {post.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="job_location"
                  className="block text-sm font-medium leading-6"
                >
                  Job Location
                </label>
                <div className="mt-2">
                  <select
                    id="job_location"
                    name="job_location"
                    required
                    value={formData.job_location}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-3 px-5  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
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
          </div>

          {/* salary info */}
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base md:text-xl font-semibold leading-7  ">
              Salary Information
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-8">
              <div className="sm:col-span-4">
                <label
                  htmlFor="salary_grade"
                  className="block text-sm font-medium leading-6  "
                >
                  Salary Grade
                </label>
                <div className="mt-2">
                  <select
                    id="salary_grade"
                    name="salary_grade"
                    onChange={handleChange}
                    value={formData.salary_grade}
                    required
                    autoComplete="salary_grade"
                    className="block w-full rounded-md border-0 py-2 px-5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
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

              <div className="sm:col-span-4">
                <label
                  htmlFor="salary_step"
                  className="block text-sm font-medium leading-6  "
                >
                  Salary Step
                </label>
                <div className="mt-2">
                  <select
                    id="salary_step"
                    name="salary_step"
                    onChange={handleChange}
                    value={formData.salary_step}
                    required
                    autoComplete="salary_step"
                    className="block w-full rounded-md border-0 py-2 px-5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
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
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner></LoadingSpinner> : "Add To Employee Database"}
            </button>
          </div>
        </div>
      </form>

      {/* Display error messages */}
      {errorMessage && (
        <div className="mt-6 text-center text-base text-red-600">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default EntryNewEmployee;
