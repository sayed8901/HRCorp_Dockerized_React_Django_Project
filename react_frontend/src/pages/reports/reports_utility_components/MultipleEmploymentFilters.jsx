import PropTypes from "prop-types";

const MultipleEmploymentFilters = ({
  filterID,
  setFilterID,

  filterName,
  setFilterName,

  filterDepartment,
  setFilterDepartment,

  filterDesignation,
  setFilterDesignation,

  filterJobLocation,
  setFilterJobLocation,
}) => {
  return (
    <div className="sm:mx-2 lg:mx-6">
      {/* Filter input fields */}
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <div className="flex gap-4 w-full">
          <input
            type="text"
            placeholder="Filter by 'ID'"
            className="input input-bordered w-full sm:flex-grow" // Same here
            value={filterID}
            onChange={(e) => setFilterID(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by 'Name'"
            className="input input-bordered w-full sm:flex-grow" // Grow to fill available space
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </div>

        <div className="flex gap-4 w-full">
          <input
            type="text"
            placeholder="Filter by 'Position'"
            className="input input-bordered w-full sm:flex-grow" // Same here
            value={filterDesignation}
            onChange={(e) => setFilterDesignation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by 'Dept.'"
            className="input input-bordered w-full sm:flex-grow"
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
          />
        </div>

        <input
          type="text"
          placeholder="Filter by 'Job Location'"
          className="input input-bordered w-full md:w-3/4 lg:w-2/4 sm:flex-grow mx-auto"
          value={filterJobLocation}
          onChange={(e) => setFilterJobLocation(e.target.value)}
        />
      </div>
    </div>
  );
};

MultipleEmploymentFilters.propTypes = {
  filterID: PropTypes.string.isRequired,
  setFilterID: PropTypes.func.isRequired,

  filterName: PropTypes.string.isRequired,
  setFilterName: PropTypes.func.isRequired,

  filterDepartment: PropTypes.string.isRequired,
  setFilterDepartment: PropTypes.func.isRequired,

  filterDesignation: PropTypes.string.isRequired,
  setFilterDesignation: PropTypes.func.isRequired,

  filterJobLocation: PropTypes.string.isRequired,
  setFilterJobLocation: PropTypes.func.isRequired,
};

export default MultipleEmploymentFilters;
