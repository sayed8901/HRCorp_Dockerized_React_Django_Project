import { useEffect, useState } from "react";
import useTitle from "../../utilities/useTitle";

const PowerUserProfile = () => {
  useTitle("Power_user Profile");

  const [accountInfo, setAccountInfo] = useState({});
  const [usersPersonalInfo, setUsersPersonalInfo] = useState({});
  const token = localStorage.getItem("authToken");
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/accounts/user/?user_id=${user_id}`
        );
        const user = await response.json();
        setAccountInfo(user);
        localStorage.setItem("power_user_id", user.id);
      } catch (error) {
        console.error("Error fetching account info:", error);
      }
    };

    const fetchUsersPersonalInfo = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/power_user/by_user_id/?user_id=${user_id}`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        const user = await response.json();
        setUsersPersonalInfo(user);
        localStorage.setItem("power_user_id", user.id);
      } catch (error) {
        console.error("Error fetching personal info:", error);
      }
    };

    fetchAccountInfo();
    fetchUsersPersonalInfo();
  }, [token, user_id]);

  return (
    <div className="container mx-auto px-2 sm:px-0 mb-10">
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto px-5 mb-10 pt-20">
        <div className="px-4 sm:px-0">
          <h2 className="text-center text-3xl font-semibold leading-8  mb-16">
            <span className="text-gradient">Power User</span> Information
          </h2>
        </div>

        <div className="mt-6 border-t border-gray-200">
          {accountInfo && (
            <dl className="divide-y divide-gray-200">
              <div className="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6">
                  Full name
                </dt>
                <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                  {accountInfo.first_name} {accountInfo.last_name}
                </dd>
              </div>
              <div className="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6">
                  Username
                </dt>
                <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                  {accountInfo.username}
                </dd>
              </div>
              <div className="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6">
                  Contact number
                </dt>
                <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                  {usersPersonalInfo?.contact_no}
                </dd>
              </div>
              <div className="p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6">
                  Email address
                </dt>
                <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                  {accountInfo.email}
                </dd>
              </div>
            </dl>
          )}
        </div>
      </div>
    </div>
  );
};

export default PowerUserProfile;
