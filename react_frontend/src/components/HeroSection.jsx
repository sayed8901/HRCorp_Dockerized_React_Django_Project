import { Link } from "react-router-dom";
import banner from "../../src/assets/banner.jpg";

const HeroSection = () => {
  const userType = localStorage.getItem('user_type');

  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${banner})`,
          minHeight: "calc(100vh - 65px)",
        }}
      >
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl">
              Welcome to <span className="font-bold text-gradient">HRCorp</span>
            </h1>
            <div className="my-16 space-y-5">
              <p>
                This is one stop solution for Managing the Human Resources and
                related activities of the organization.
              </p>
              <p>
                User can easily manage staff related various HR operations like
                recruitment, employee transitions, employee database management,
                performance management, payroll management, employee separation
                & final settlement, etc{" "}
              </p>
            </div>
            {userType === "standard_user" || userType === "power_user" ? (
              <Link to="/all_employee" className="btn btn-primary">
                Browse All Employee
              </Link>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Login to Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
