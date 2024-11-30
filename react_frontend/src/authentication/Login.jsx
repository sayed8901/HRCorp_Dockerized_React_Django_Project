import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contextProviders/Contexts"; // Importing the user context
import { toast } from "react-toastify";
import LoadingSpinner from "../utilities/LoadingSpinner";
import useTitle from "../utilities/useTitle";

const Login = () => {
  useTitle("Login");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(UserContext); // Get user state from context
  const navigate = useNavigate();

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

    try {
      // First Fetch: Login Request
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/accounts/login/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (data.error) {
        // Display error message
        setErrorMessage(data.error);
      } else {
        // Store the user details in localStorage
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user_id", data.user_id);

        // Second Fetch: Fetch User Details
        const userResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/accounts/user/?user_id=${
            data.user_id
          }`,
          {
            headers: {
              Authorization: `Token ${data.token}`,
            },
          }
        );
        const userData = await userResponse.json();

        localStorage.setItem("user_type", userData.user_type);
        localStorage.setItem("username", userData.username);

        // Update the user context
        updateUser({
          username: userData.username,
          userType: userData.user_type,
        });

        // Show success toast
        toast.success("Login Successful.");
        console.log(successMessage);

        // Conditionally redirecting
        if (userData.user_type === "standard_user") {
          navigate("/standard_user_profile");
        } else if (userData.user_type === "power_user") {
          navigate("/power_user_profile");
        }
      }
    } catch (error) {
      // Display error message
      setErrorMessage("An error occurred. Please try again.");
      console.error("Login error", error);
    } finally {
      setIsLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="container mx-auto mb-10">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            <span className="text-gradient">Sign in</span> to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                  className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-2 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 my-10"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner></LoadingSpinner> : "Log in"}
              </button>
            </div>
          </form>

          {/* Display error messages */}
          {errorMessage && (
            <div className="mt-6 text-center text-base text-red-600">
              {errorMessage}
            </div>
          )}

          <p className="mt-10 mb-2 text-center text-sm text-gray-500">
            Do not have an account yet? No Tension.
          </p>
          <div className="flex justify-between gap-3">
            <a
              href="/standard_user_register"
              className="font-semibold leading-6 text-indigo-500 hover:text-indigo-400 text-sm"
            >
              Create Standard_user Account.
            </a>
            <a
              href="/power_user_register"
              className="font-semibold leading-6 text-indigo-500 hover:text-indigo-400 text-sm"
            >
              Create Power_user Account.
            </a>
          </div>

          {/* Display credentials info */}
          <div className="mt-10 p-6 border rounded-lg shadow-md bg-gray-100">
            <h3 className="font-semibold text-xl text-center text-indigo-600 mb-4">
              Credentials for Testing:
            </h3>

            <div className="mb-4 p-4 border rounded-lg shadow-md bg-white">
              <div className="mt-2 text-center text-sm text-gray-700">
                <p className="mb-1">
                  Power_user Username: <strong>Tasmi</strong>
                </p>
                <p className="mb-1">
                  Power_user Password: <strong>sayed8901</strong>
                </p>
              </div>
            </div>

            <div className="p-4 border rounded-lg shadow-md bg-white">
              <div className="mt-2 text-center text-sm text-gray-700">
                <p className="mb-1">
                  Standard_user Username: <strong>Sohel</strong>
                </p>
                <p className="mb-1">
                  Standard_user Password: <strong>sayed8901</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
