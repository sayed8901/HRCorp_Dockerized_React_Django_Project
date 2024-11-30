import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../contextProviders/Contexts"; // Importing the user context
import UpdatePostDeptLocationModal from "./UpdatePostDeptLocationModal";
import CreateNewPostDeptLocationModal from "./CreateNewPostDeptLocationModal";
import { toast } from "react-toastify";
import useTitle from "../../../utilities/useTitle";
import LoadingSpinner from "../../../utilities/LoadingSpinner";

const ManagePostDeptLocation = () => {
  useTitle("Manage Post Dept Location");

  const [designations, setDesignations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [jobLocations, setJobLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(UserContext); // Get user state from context

  const [currentUpdate, setCurrentUpdate] = useState({ type: "", id: "" });
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [currentCreate, setCurrentCreate] = useState({ type: "" });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [designationsRes, departmentsRes, jobLocationsRes] =
        await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/employment/designations/`),
          fetch(`${import.meta.env.VITE_API_URL}/employment/departments/`),
          fetch(`${import.meta.env.VITE_API_URL}/employment/job_locations/`),
        ]);

      const designationsData = await designationsRes.json();
      const departmentsData = await departmentsRes.json();
      const jobLocationsData = await jobLocationsRes.json();

      setDesignations(designationsData);
      setDepartments(departmentsData);
      setJobLocations(jobLocationsData);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const token = localStorage.getItem("authToken");

  // update function
  const handleUpdate = async (type, id, name = null) => {
    setCurrentUpdate({ type, id });

    if (name) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/employment/${type}/${id}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
            body: JSON.stringify({ name }),
          }
        );

        if (response.ok) {
          fetchData();
          setIsUpdateModalOpen(false);
          toast.success(`Successfully updated`);
        } else {
          throw new Error(`Failed to update ${type}`);
        }
      } catch (error) {
        console.error(`Error updating ${type}`, error);
        toast.error(`Failed to update ${type}`);
      }
    } else {
      setIsUpdateModalOpen(true);
    }
  };

  // for adding functionality
  const handleAdd = async (type, name) => {
    if (name) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/employment/${type}/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
            body: JSON.stringify({ name }),
          }
        );

        if (response.ok) {
          fetchData();
          setIsCreateModalOpen(false);
          toast.success(`Successfully added`);
        } else {
          throw new Error(`Failed to add ${type}`);
        }
      } catch (error) {
        console.error(`Error adding ${type}`, error);
        toast.error(`Failed to add ${type}`);
      }
    } else {
      setCurrentCreate({ type });
      setIsCreateModalOpen(true);
    }
  };

  return (
    <div className="mt-16 mb-10 mx-2 sm:mx-5 lg:mx-10">
      <div className="sm:mx-auto my-10 text-center text-xl md:text-2xl font-semibold leading-9 tracking-tight">
        <p>
          Here you can view all the available{" "}
          <span className="text-gradient">
            designations, departments, and job locations
          </span>
          .
        </p>
        {user.userType === "power_user" && (
          <p>
            You can also <span className="text-gradient">Add or Update</span>{" "}
            any item.
          </p>
        )}
      </div>

      <div className="flex flex-col md:flex-row w-full">
        {/* Departments Section */}
        <div className="card bg-base-300 rounded-box flex-grow p-4 mb-4">
          <h3 className="text-md lg:text-lg font-semibold mb-2">
            All Departments
          </h3>

          {/* add btn */}
          {user.userType === "power_user" && (
            <button
              className="btn btn-primary mt-4 mb-8 font-bold text-md"
              onClick={() => handleAdd("departments")}
            >
              Add Department
            </button>
          )}

          {/* all departments */}
          {loading ? (
            <LoadingSpinner></LoadingSpinner>
          ) : (
            <ul className="space-y-2">
              {departments.map((department) => (
                <li
                  key={department.id}
                  className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm"
                >
                  <span>{department.name}</span>
                  {user.userType === "power_user" && (
                    <button
                      className="btn btn-primary btn-xs"
                      onClick={() => handleUpdate("departments", department.id)}
                    >
                      Update
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="divider divider-horizontal"></div>

        {/* Designations Section */}
        <div className="card bg-base-300 rounded-box flex-grow p-4 mb-4">
          <h3 className="text-md lg:text-lg font-semibold mb-2">
            All Designations
          </h3>

          {/* add btn */}
          {user.userType === "power_user" && (
            <button
              className="btn btn-primary mt-4 mb-8 font-bold text-md"
              onClick={() => handleAdd("designations")}
            >
              Add Designation
            </button>
          )}

          {/* all designations */}
          {loading ? (
            <LoadingSpinner></LoadingSpinner>
          ) : (
            <ul className="space-y-2">
              {designations.map((designation) => (
                <li
                  key={designation.id}
                  className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm"
                >
                  <span>{designation.name}</span>
                  {user.userType === "power_user" && (
                    <button
                      className="btn btn-primary btn-xs" // Adjusted to smaller size
                      onClick={() =>
                        handleUpdate("designations", designation.id)
                      }
                    >
                      Update
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="divider divider-horizontal"></div>

        {/* Job Locations Section */}
        <div className="card bg-base-300 rounded-box flex-grow p-4 mb-4">
          <h3 className="text-md lg:text-lg font-semibold mb-2">
            All Job Locations
          </h3>

          {/* add btn */}
          {user.userType === "power_user" && (
            <button
              className="btn btn-primary mt-4 mb-8 font-bold text-md"
              onClick={() => handleAdd("job_locations")}
            >
              Add Location
            </button>
          )}

          {/* all job locations */}
          {loading ? (
            <LoadingSpinner></LoadingSpinner>
          ) : (
            <ul className="space-y-2">
              {jobLocations.map((jobLocation) => (
                <li
                  key={jobLocation.id}
                  className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm"
                >
                  <span>{jobLocation.name}</span>
                  {user.userType === "power_user" && (
                    <button
                      className="btn btn-primary btn-xs" // Adjusted to smaller size
                      onClick={() =>
                        handleUpdate("job_locations", jobLocation.id)
                      }
                    >
                      Update
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Modals */}
      {isUpdateModalOpen && (
        <UpdatePostDeptLocationModal
          id={currentUpdate.id}
          type={currentUpdate.type}
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          onSave={(name) =>
            handleUpdate(currentUpdate.type, currentUpdate.id, name)
          }
        />
      )}

      {isCreateModalOpen && (
        <CreateNewPostDeptLocationModal
          type={currentCreate.type}
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSave={(name) => handleAdd(currentCreate.type, name)}
        />
      )}
    </div>
  );
};

export default ManagePostDeptLocation;
