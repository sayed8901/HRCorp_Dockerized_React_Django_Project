import useEmployeesData from "../../../utilities/dataFetches/useAllEmployeesData";
import useFetch from "../../../utilities/dataFetches/useDataFetchHooks";
import LoadingSpinner from "../../../utilities/LoadingSpinner";
import PropTypes from "prop-types";
import UpcomingModule from "../../UpcomingModule";

const EmployeeDetailsTab = ({ employee_id }) => {
  // Fetch all the employees full info data
  const {
    allEmployeesFullInfo,
    loading: employeeLoading,
    error: employeeError,
  } = useEmployeesData();

  // Fetch job profile data
  const {
    data: jobProfileData,
    error: jobProfileError,
    loading: jobProfileLoading,
  } = useFetch(
    `${
      import.meta.env.VITE_API_URL
    }/job_profile_history/?employee_id=${employee_id}`
  );
  //   console.log("id:", employee_id, "profile", jobProfileData);

  // getting the employee by employee_id
  const employee = allEmployeesFullInfo.find(
    (emp) => emp.employee_id === employee_id
  );

  if (employeeLoading || jobProfileLoading)
    return <LoadingSpinner></LoadingSpinner>;
  if (employeeError || jobProfileError)
    return <div>Error: {employeeError || jobProfileError}</div>;
  if (!employee) return <UpcomingModule title="Employee"></UpcomingModule>;

  return (
    <div>
      {/* tabs */}
      <div role="tablist" className="tabs tabs-lifted md:w-11/12 mx-auto">
        {/* Personal Information Tab */}
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab font-bold sm:text-lg sm:mx-2"
          aria-label="Personal_Info"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <dl className="divide-y divide-gray-200 w-full md:w-11/12 lg:w-5/6 mx-auto">
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Name</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.personal_info?.name}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Father Name</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.personal_info?.father_name}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Mother Name</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.personal_info?.mother_name}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Email</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.personal_info?.email}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Contact Number</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.personal_info?.contact_number}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Date of Birth</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.personal_info?.date_of_birth}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Gender</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.personal_info?.gender}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Marital Status</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.personal_info?.marital_status}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Spouse</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.personal_info?.spouse_name}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Blood Group</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.personal_info?.blood_group}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Education</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.personal_info?.educational_degree}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Smart NID</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.personal_info?.smart_id}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">
                Permanent Address
              </dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.personal_info?.permanent_address}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Present Address</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.personal_info?.present_address}
              </dd>
            </div>
          </dl>
        </div>

        {/* Employment Information Tab */}
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab font-bold sm:text-lg sm:mx-2"
          aria-label="Employment_Info"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <dl className="divide-y divide-gray-200 w-full md:w-11/12 lg:w-5/6 mx-auto">
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Name</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.personal_info?.name}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Status</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.employment_info?.status}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Is Confirmed</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.salary_info?.is_confirmed ? "Yes" : "No"}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Designation</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.employment_info?.designation}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Department</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.employment_info?.department}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Job Locations</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.employment_info?.job_location}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Joining Date</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.employment_info?.joining_date}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">
                Probation Period (months)
              </dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.employment_info?.probation_period_months}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">
                Tentative Confirmation Date
              </dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.employment_info?.tentative_confirmation_date}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">
                Confirmation Effective Date
              </dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.employment_info?.confirmation_effective_date}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">
                Last Promotion Date
              </dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.last_promotion?.promotion_effective_date}
              </dd>
            </div>
          </dl>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab font-bold sm:text-lg sm:mx-2"
          aria-label="Salary_Info"
        />

        {/* Salary Information Tab */}
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <dl className="divide-y divide-gray-200 w-full md:w-11/12 lg:w-5/6 mx-auto">
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Salary Grade</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.salary_info?.salary_grade}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Starting Basic</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.salary_info?.starting_basic}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Salary Step</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.salary_info?.salary_step}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Effective basic</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.salary_info?.effective_basic}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">House Rent</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.salary_info?.house_rent}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">
                Medical Allowance
              </dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.salary_info?.medical_allowance}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">
                Conveyance Allowance
              </dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.salary_info?.conveyance}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">
                Hardship Allowance
              </dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.salary_info?.hardship}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">PF Contribution</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.salary_info?.pf_contribution}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Festival Bonus</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.salary_info?.festival_bonus}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Gross Salary</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.salary_info?.gross_salary}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">PF Deduction</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.salary_info?.pf_deduction}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">SWF Deduction</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.salary_info?.swf_deduction}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Tax Deduction</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.salary_info?.tax_deduction}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">
                Salary Deduction
              </dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.salary_info?.npl_salary_deduction}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Net Salary</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.salary_info?.net_salary}
              </dd>
            </div>

            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">
                sick_leave_balance
              </dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.salary_info?.sick_leave_balance}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">
                casual_leave_balance
              </dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 font-bold">
                {employee?.salary_info?.casual_leave_balance}
              </dd>
            </div>
          </dl>
        </div>

        {/* Job Profile History Tab */}
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab font-bold sm:text-lg sm:mx-2"
          aria-label="Job_Profile"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical w-full md:w-11/12 lg:w-5/6 mx-auto">
            {jobProfileData &&
              jobProfileData.map((jobProfile, index) => (
                <li key={index}>
                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div
                    className={`timeline-${
                      index % 2 === 0 ? "start" : "end"
                    } mb-3`}
                  >
                    <time className="font-mono italic">
                      {jobProfile.start_date}
                    </time>
                    <div className="text-lg font-black">
                      {jobProfile.job_title}
                    </div>
                    {/* showing profile data */}
                    <div className="flex justify-between">
                      <p>
                        <strong>{jobProfile.effective_date}</strong>
                      </p>
                      <p>
                        <strong>-- {jobProfile.event_type}</strong>
                      </p>
                    </div>
                    <p>{jobProfile.details}</p>
                  </div>
                  <hr />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

EmployeeDetailsTab.propTypes = {
  employee_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired, // Ensure employee_id is a string or number and is required
};

export default EmployeeDetailsTab;
