import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../utilities/LoadingSpinner";
import { toast } from "react-toastify";
import useTitle from "../utilities/useTitle";

const StandardUserRegister = () => {
  useTitle("Standard_user Register");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [powerUsers, setPowerUsers] = useState([]);
  
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    contact_no: "",
    email: "",
    password: "",
    confirm_password: "",
    supervisor: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/power_user/list/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPowerUsers(data);
      })
      .catch((err) => console.log("Error fetching power_users:", err));
  }, []);

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

    console.log("formData", formData);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/standard_user/register/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log(data);

      if (response.status === 400) {
        // Display error message
        setErrorMessage(data.error);
      } else {
        // Show success toast
        toast.success(
          "Registration Successful. Please check your email for confirmation."
        );
        console.log(successMessage);
        navigate("/login");
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
        className="w-full md:w-2/3 lg:w-1/2 mx-auto px-5 mb-10 pt-20"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-xl md:text-2xl font-bold leading-7">
              Standard User{" "}
              <span className="text-gradient">Registration form</span>
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    onChange={handleChange}
                    required
                    autoComplete="username"
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium leading-6"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    onChange={handleChange}
                    required
                    autoComplete="first_name"
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium leading-6"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    onChange={handleChange}
                    required
                    autoComplete="last_name"
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="contact_no"
                  className="block text-sm font-medium leading-6"
                >
                  Contact no
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="contact_no"
                    id="contact_no"
                    onChange={handleChange}
                    required
                    autoComplete="contact_no"
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6"
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
                    className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="supervisor"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Supervisor
                </label>
                <div className="mt-2">
                  <select
                    id="supervisor"
                    name="supervisor"
                    required
                    value={formData.supervisor}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-3 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 bg-white"
                  >
                    <option value="" disabled>
                      Select a supervisor
                    </option>
                    {powerUsers.map((boss) => (
                      <option key={boss.id} value={boss.id}>
                        {boss.user.username}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="sm:col-span-3 mt-5">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                  className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                />
              </div>
            </div>

            <div className="sm:col-span-3 mt-5 mb-10">
              <label
                htmlFor="confirm_password"
                className="block text-sm font-medium leading-6"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                  className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner></LoadingSpinner> : "Create Account"}
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

export default StandardUserRegister;
