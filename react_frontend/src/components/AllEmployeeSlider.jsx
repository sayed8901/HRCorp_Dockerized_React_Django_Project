import Marquee from "react-fast-marquee";
import useEmployeesData from "../../src/utilities/dataFetches/useAllEmployeesData";
import LoadingSpinner from "../utilities/LoadingSpinner";
import userIcon from "../../src/assets/profile_img.png";

const AllEmployeeSlider = () => {
  const { allActiveEmployeesInfo, loading, error } = useEmployeesData();

  return (
    <div className="my-28">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mb-10 text-center text-2xl sm:text-3xl font-semibold leading-9 tracking-tight">
          Meet <span className="text-gradient">Top Employees</span> of the month
        </h2>
      </div>

      {loading && <LoadingSpinner />}

      {/* Display error messages */}
      {error && (
        <div className="mt-6 text-center text-base text-red-600">{error}</div>
      )}

      <Marquee
        speed={150}
        pauseOnHover={true}
        className="py-3 py-lg-4 bg-base-200"
      >
        {allActiveEmployeesInfo?.map((employee) => (
          <div key={employee?.employee_id} className="px-4 mask mask-hexagon-2">
            <div className="card bg-base-100 w-72 shadow-xl p-2">
              <div className="card-body text-center">
                <div className="flex justify-center items-center gap-2 mb-4">
                  <img
                    className="h-10 w-8 rounded-full"
                    src={userIcon}
                    alt="Profile Icon"
                    style={{ filter: "invert(50%)" }}
                  />
                  <div className="flex flex-col flex-start">
                    <h2>ID# {employee?.employee_id}</h2>
                    <h2 className="font-bold">
                      {employee?.personal_info?.name}
                    </h2>
                  </div>
                </div>
                <p>
                  {employee?.employment_info?.designation} (
                  {employee?.employment_info?.department})
                </p>
                <p>Location: {employee?.employment_info?.job_location}</p>
                <p>Joining Date: {employee?.employment_info?.joining_date}</p>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default AllEmployeeSlider;
