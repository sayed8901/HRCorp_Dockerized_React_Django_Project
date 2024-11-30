import { useState } from "react";
import PropTypes from "prop-types";

const CreateNewPostDeptLocationModal = ({ type, isOpen, onClose, onSave }) => {
  const [name, setName] = useState("");

  const handleSave = () => {
    onSave(name);
    onClose(); // Close modal after saving
  };

  return (
    <>
      <input
        type="checkbox"
        id={`create_modal_${type}`}
        checked={isOpen}
        className="modal-toggle"
        readOnly
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Add New {type}</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full mt-2"
            placeholder={`Enter ${type} name`}
          />
          <div className="modal-action">
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={!name}
            >
              Save
            </button>
            <button className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

CreateNewPostDeptLocationModal.propTypes = {
  type: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default CreateNewPostDeptLocationModal;
