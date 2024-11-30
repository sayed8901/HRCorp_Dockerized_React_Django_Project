import HeroSection from "../components/HeroSection";
import StatDashboard from "../components/StatDashboard";
import useTitle from "../utilities/useTitle";
import LazyLoad from "react-lazy-load";
import EmployeeDetails from "./HR_staff_management/EmployeeDetails/EmployeeDetails";
import FAQSection from "../components/FAQSection";
import AllEmployeeSlider from "../components/AllEmployeeSlider";
import ManpowerStatus from "./reports/ManpowerStatus";

const HomePage = () => {
  useTitle();

  return (
    <div className="container mx-auto">
      <LazyLoad>
        <HeroSection></HeroSection>
      </LazyLoad>
      <LazyLoad>
        <StatDashboard></StatDashboard>
      </LazyLoad>
      <LazyLoad>
        <ManpowerStatus></ManpowerStatus>
      </LazyLoad>
      <LazyLoad>
        <AllEmployeeSlider></AllEmployeeSlider>
      </LazyLoad>
      <LazyLoad className="mb-28">
        <EmployeeDetails></EmployeeDetails>
      </LazyLoad>
      <LazyLoad>
        <FAQSection></FAQSection>
      </LazyLoad>
    </div>
  );
};

export default HomePage;
