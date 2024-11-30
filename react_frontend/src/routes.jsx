import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./utilities/ScrollToTop.jsx";
import LazyLoad from "react-lazy-load";
import ErrorPage from "./pages/ErrorPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import PowerUserRegister from "./authentication/PowerUserRegister.jsx";
import StandardUserRegister from "./authentication/StandardUserRegister.jsx";
import Login from "./authentication/Login.jsx";
import PowerUserProfile from "./pages/profiles/PowerUserProfile.jsx";
import StandardUserProfile from "./pages/profiles/StandardUserProfile.jsx";
import EntryNewEmployee from "./pages/HR_staff_management/EntryNewEmployee.jsx";
import AllEmployeeList from "./pages/HR_staff_management/AllEmployeeList/AllEmployeeList.jsx";
import EmployeeDetails from "./pages/HR_staff_management/EmployeeDetails/EmployeeDetails.jsx";
import Transfer from "./pages/HR_operation/Transfer/Transfer.jsx";
import JobConfirmation from "./pages/HR_operation/Job_confirmation/JobConfirmation.jsx";
import Promotion from "./pages/HR_operation/Promotion/Promotion.jsx";
import Separation from "./pages/HR_operation/Separation/Separation.jsx";
import ManagePostDeptLocation from "./pages/HR_staff_management/Manage_post_dept_locations/ManagePostDeptLocation.jsx";
import ManpowerStatus from "./pages/reports/ManpowerStatus.jsx";
import JoinedStaffStatus from "./pages/reports/JoiningReport.jsx";
import SeparationReport from "./pages/reports/SeparationReport.jsx";
import TransferReport from "./pages/reports/TransferReport.jsx";
import JobConfirmationReport from "./pages/reports/JobConfirmationReport.jsx";
import TransferList from "./pages/HR_operation/Transfer_list/Transfer_list.jsx";
import PromotionReport from "./pages/reports/PromotionReport.jsx";
import UpcomingModule from "./pages/UpcomingModule.jsx";
import EntryLeave from "./pages/Payroll/Entry_leave/EntryLeave.jsx";
import Payroll from "./pages/Payroll/Salary_sheet/Payroll.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop></ScrollToTop>
        <App></App>
      </>
    ),
    errorElement: (
      <LazyLoad>
        <ErrorPage></ErrorPage>
      </LazyLoad>
    ),
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },

      // standard_user routes
      {
        path: "/standard_user_register",
        element: (
          <LazyLoad>
            <StandardUserRegister></StandardUserRegister>
          </LazyLoad>
        ),
      },
      {
        path: "/standard_user_profile",
        element: (
          <LazyLoad>
            <StandardUserProfile></StandardUserProfile>
          </LazyLoad>
        ),
      },

      // power_user routes
      {
        path: "/power_user_register",
        element: (
          <LazyLoad>
            <PowerUserRegister></PowerUserRegister>
          </LazyLoad>
        ),
      },
      {
        path: "/power_user_profile",
        element: (
          <LazyLoad>
            <PowerUserProfile></PowerUserProfile>
          </LazyLoad>
        ),
      },

      {
        path: "/salary_deduction",
        element: (
          <LazyLoad>
            <UpcomingModule title="Salary deduction part"></UpcomingModule>
          </LazyLoad>
        ),
      },

      // common routes both for power_user & standard_user
      {
        path: "/login",
        element: (
          <LazyLoad>
            <Login></Login>
          </LazyLoad>
        ),
      },

      {
        path: "/entry_new_employee",
        element: (
          <LazyLoad>
            <EntryNewEmployee></EntryNewEmployee>
          </LazyLoad>
        ),
      },
      {
        path: "/all_employee",
        element: (
          <LazyLoad>
            <AllEmployeeList></AllEmployeeList>
          </LazyLoad>
        ),
      },

      {
        path: "/transfer",
        element: (
          <LazyLoad>
            <Transfer></Transfer>
          </LazyLoad>
        ),
      },
      {
        path: "/transfer_list",
        element: (
          <LazyLoad>
            <TransferList></TransferList>
          </LazyLoad>
        ),
      },
      {
        path: "/job_confirmation",
        element: (
          <LazyLoad>
            <JobConfirmation></JobConfirmation>
          </LazyLoad>
        ),
      },
      {
        path: "/promotion",
        element: (
          <LazyLoad>
            <Promotion></Promotion>
          </LazyLoad>
        ),
      },
      {
        path: "/separation",
        element: (
          <LazyLoad>
            <Separation></Separation>
          </LazyLoad>
        ),
      },

      {
        path: "/joining_report",
        element: (
          <LazyLoad>
            <JoinedStaffStatus></JoinedStaffStatus>
          </LazyLoad>
        ),
      },
      {
        path: "/separation_report",
        element: (
          <LazyLoad>
            <SeparationReport></SeparationReport>
          </LazyLoad>
        ),
      },
      {
        path: "/transfer_report",
        element: (
          <LazyLoad>
            <TransferReport></TransferReport>
          </LazyLoad>
        ),
      },
      {
        path: "/job_confirmation_report",
        element: (
          <LazyLoad>
            <JobConfirmationReport></JobConfirmationReport>
          </LazyLoad>
        ),
      },
      {
        path: "/promotion_report",
        element: (
          <LazyLoad>
            <PromotionReport></PromotionReport>
          </LazyLoad>
        ),
      },

      // {
      //   path: "/training",
      //   element: (
      //     <LazyLoad>
      //       <UpcomingModule title="Training section"></UpcomingModule>
      //     </LazyLoad>
      //   ),
      // },
      // {
      //   path: "/training_report",
      //   element: (
      //     <LazyLoad>
      //       <UpcomingModule title="Training report section"></UpcomingModule>
      //     </LazyLoad>
      //   ),
      // },

      {
        path: "/entry_leave_data",
        element: (
          <LazyLoad>
            <EntryLeave></EntryLeave>
          </LazyLoad>
        ),
      },
      // {
      //   path: "/salary_deduction",
      //   element: (
      //     <LazyLoad>
      //       <UpcomingModule title="Late attendance part"></UpcomingModule>
      //     </LazyLoad>
      //   ),
      // },
      {
        path: "/salary_sheet",
        element: (
          <LazyLoad>
            <Payroll></Payroll>
          </LazyLoad>
        ),
      },

      // accessible routes for power_user, standard_user, general employee or even if there is no logged_in_user
      {
        path: "/employee_details/:employee_id",
        element: (
          <LazyLoad>
            <EmployeeDetails></EmployeeDetails>
          </LazyLoad>
        ),
      },
      {
        path: "/view_employee_details",
        element: (
          <LazyLoad>
            <EmployeeDetails></EmployeeDetails>
          </LazyLoad>
        ),
      },

      // {
      //   path: "/employee_dashboard",
      //   element: (
      //     <LazyLoad>
      //       <UpcomingModule title="Employee dashboard"></UpcomingModule>
      //     </LazyLoad>
      //   ),
      // },

      {
        path: "/manage_post_dept_location",
        element: (
          <LazyLoad>
            <ManagePostDeptLocation></ManagePostDeptLocation>
          </LazyLoad>
        ),
      },

      // reports
      {
        path: "/manpower_status",
        element: (
          <LazyLoad>
            <ManpowerStatus></ManpowerStatus>
          </LazyLoad>
        ),
      },
    ],
  },
]);
