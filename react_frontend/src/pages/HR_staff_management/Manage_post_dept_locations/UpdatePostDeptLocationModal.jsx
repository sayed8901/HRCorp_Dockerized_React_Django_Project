import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const UpdatePostDeptLocationModal = ({ id, type, isOpen, onClose, onSave }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    // Fetch current data if needed when modal opens
    if (isOpen && id) {
      fetch(`${import.meta.env.VITE_API_URL}/employment/${type}/${id}/`)
        .then((response) => response.json())
        .then((data) => setName(data.name))
        .catch((error) => console.error("Error fetching data", error));
    }
  }, [isOpen, id, type]);

  const handleSave = () => {
    onSave(name);
    onClose(); // Close modal after saving
  };

  return (
    <>
      <input
        type="checkbox"
        id={`update_modal_${id}`}
        checked={isOpen}
        className="modal-toggle"
        readOnly
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Update {type}</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full mt-2"
            placeholder={`Enter new ${type} name`}
          />
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
            <label
              className="btn"
              onClick={onClose}
              htmlFor={`update_modal_${id}`}
            >
              Cancel
            </label>
          </div>
        </div>
        <label
          className="modal-backdrop"
          htmlFor={`update_modal_${id}`}
        ></label>
      </div>
    </>
  );
};

// Define prop-types validation
UpdatePostDeptLocationModal.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default UpdatePostDeptLocationModal;
