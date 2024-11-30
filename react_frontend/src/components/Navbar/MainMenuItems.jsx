import PropTypes from "prop-types";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const MainMenuItems = ({ user }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const handleMenuToggle = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <>
      {/* HR Staff Management */}
      <div className="dropdown m-2 lg:my-2 lg:mx-1 w-56 lg:w-24 lg:text-center">
        <div
          tabIndex={0}
          role="button"
          className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
          onClick={() => handleMenuToggle("hrStaffManagement")}
        >
          HR staff management
        </div>
        <ul
          tabIndex={0}
          className={`menu dropdown-content bg-base-100 rounded-box z-[1] p-2 -mt-8 lg:mt-2 shadow-lg space-y-2 ${
            openMenu === "hrStaffManagement" ? "block" : "hidden"
          }`}
          style={{
            position: "absolute",
            top: "100%",
            right: "0",
          }}
        >
          {(user.userType === "standard_user" ||
            user.userType === "power_user") && (
            <>
              <li>
                <NavLink
                  to="/entry_new_employee"
                  className="rounded-md px-2 py-1 sm:py-0 lg:py-2 text-sm font-medium btn-ghost border-0"
                >
                  Entry_new employee
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/all_employee"
                  className="rounded-md px-2 py-1 sm:py-0 lg:py-2 text-sm font-medium btn-ghost border-0"
                >
                  All_employee
                </NavLink>
              </li>
            </>
          )}

          <>
            <li>
              <NavLink
                to="/view_employee_details"
                className="rounded-md px-2 py-1 sm:py-0 lg:py-2 text-sm font-medium btn-ghost border-0"
              >
                Employee details_view
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/employee_dashboard"
                className="rounded-md px-2 py-1 sm:py-0 lg:py-2 text-sm font-medium btn-ghost border-0"
              >
                Employee dashboard
              </NavLink>
            </li> */}
            {(user.userType === "standard_user" ||
              user.userType === "power_user") && (
              <li>
                <NavLink
                  to="/manage_post_dept_location"
                  className="rounded-md px-2 py-1 sm:py-0 lg:py-2 text-sm font-medium btn-ghost border-0 w-40 lg:w-full"
                >
                  Manage Post, Dept. & Location
                </NavLink>
              </li>
            )}
          </>
        </ul>
      </div>
      {/* HR Operations */}
      {(user.userType === "standard_user" ||
        user.userType === "power_user") && (
        <div className="dropdown m-2 lg:my-2 lg:mx-1 w-56 lg:w-20 lg:text-center">
          <div
            tabIndex={0}
            role="button"
            className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
            onClick={() => handleMenuToggle("hrOperations")}
          >
            HR operation
          </div>
          <ul
            tabIndex={0}
            className={`menu dropdown-content bg-base-100 rounded-box z-[1] p-2 -mt-8 lg:mt-2 shadow-lg space-y-2 ${
              openMenu === "hrOperations" ? "block" : "hidden"
            }`}
            style={{
              position: "absolute",
              top: "100%",
              right: "0",
            }}
          >
            <li>
              <NavLink
                to="/transfer"
                className="rounded-md px-2 py-1 sm:py-0 lg:py-2 text-sm font-medium btn-ghost border-0"
              >
                Transfer
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/transfer_list"
                className="rounded-md px-2 py-1 sm:py-0 lg:py-2 text-sm font-medium btn-ghost border-0"
              >
                Transfer list
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/job_confirmation"
                className="rounded-md px-2 py-1 sm:py-0 lg:py-2 text-sm font-medium btn-ghost border-0"
              >
                Confirmation
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/promotion"
                className="rounded-md px-2 py-1 sm:py-0 lg:py-2 text-sm font-medium btn-ghost border-0"
              >
                Promotion
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/separation"
                className="rounded-md px-2 py-1 sm:py-0 lg:py-2 text-sm font-medium btn-ghost border-0"
              >
                Separation
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/training"
                className="rounded-md px-2 py-1 sm:py-0 lg:py-2 text-sm font-medium btn-ghost border-0"
              >
                Training
              </NavLink>
            </li> */}
          </ul>
        </div>
      )}
      {/* Reports */}
      <div className="dropdown m-2 lg:my-2 lg:mx-1 w-56 lg:w-20 lg:text-center">
        <div
          tabIndex={0}
          role="button"
          className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
          onClick={() => handleMenuToggle("reports")}
        >
          Reports
        </div>
        <ul
          tabIndex={0}
          className={`menu dropdown-content bg-base-100 rounded-box z-[1] p-2 -mt-8 lg:mt-2 shadow-lg space-y-2 ${
            openMenu === "reports" ? "block" : "hidden"
          }`}
          style={{
            position: "absolute",
            top: "100%",
            right: "0",
          }}
        >
          <li>
            <NavLink
              to="/manpower_status"
              className="rounded-md px-2 py-1 sm:py-0 lg:py-2 text-sm font-medium btn-ghost border-0"
            >
              Manpower_status
            </NavLink>
          </li>
          {(user.userType === "standard_user" ||
            user.userType === "power_user") && (
            <>
              <li>
                <NavLink
                  to="/joining_report"
                  className="rounded-md px-2 py-1 sm:py-0 lg:py-2 text-sm font-medium btn-ghost border-0"
                >
                  Joining
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/separation_report"
                  className="rounded-md px-2 py-1 sm:py-0 lg:py-2 text-sm font-medium btn-ghost border-0"
                >
                  Separation
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/transfer_report"
                  className="rounded-md px-2 py-1 sm:py-0 lg:py-2 text-sm font-medium btn-ghost border-0"
                >
                  Transfer
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/job_confirmation_report"
                  className="rounded-md px-2 py-1 sm:py-0 lg:py-2 text-sm font-medium btn-ghost border-0"
                >
                  Confirmation
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/promotion_report"
                  className="rounded-md px-2 py-1 sm:py-0 lg:py-2 text-sm font-medium btn-ghost border-0"
                >
                  Promotion
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/training_report"
                  className="rounded-md px-2 py-1 sm:py-0 lg:py-2 text-sm font-medium btn-ghost border-0"
                >
                  Training
                </NavLink>
              </li> */}
            </>
          )}
        </ul>
      </div>
      {/* Payroll Management */}
      {(user.userType === "standard_user" ||
        user.userType === "power_user") && (
        <div className="dropdown m-2 lg:my-2 lg:mx-1 w-56 lg:w-20 lg:text-center">
          <div
            tabIndex={0}
            role="button"
            className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
            onClick={() => handleMenuToggle("payrollManagement")}
          >
            Payroll
          </div>
          <ul
            tabIndex={0}
            className={`menu dropdown-content bg-base-100 rounded-box z-[1] p-2 -mt-8 lg:mt-2 shadow-lg space-y-2 ${
              openMenu === "payrollManagement" ? "block" : "hidden"
            }`}
            style={{
              position: "absolute",
              top: "100%",
              right: "0",
            }}
          >
            {(user.userType === "power_user" ||
              user.userType === "standard_user") && (
              <>
                <li>
                  <NavLink
                    to="/entry_leave_data"
                    className="rounded-md px-2 py-1 sm:py-0 lg:py-2 text-sm font-medium btn-ghost border-0"
                  >
                    Entry_leave_data
                  </NavLink>
                </li>
              </>
            )}
            {user.userType === "power_user" && (
              <>
                {/* <li>
                  <NavLink
                    to="/salary_deduction"
                    className="rounded-md px-2 py-1 sm:py-0 lg:py-2 text-sm font-medium btn-ghost border-0"
                  >
                    Salary deduction
                  </NavLink>
                </li> */}
              </>
            )}
            <li>
              <NavLink
                to="/salary_sheet"
                className="rounded-md px-2 py-1 sm:py-0 lg:py-2 text-sm font-medium btn-ghost border-0"
              >
                Salary_sheet
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      {/* Recruitment site */}
      {/* <div
        className="tooltip tooltip-bottom tooltip-primary rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0 m-2 lg:my-2 lg:mx-1 w-56 lg:w-24 lg:text-center"
        data-tip="You can also check out our job portal site"
      >
        <NavLink
          // target="_blank"
          to="https://bd-job-portal.netlify.app" // address for job portal
        >
          Recruitment portal
        </NavLink>
      </div> */}
    </>
  );
};

MainMenuItems.propTypes = {
  user: PropTypes.object.isRequired,
};

export default MainMenuItems;
