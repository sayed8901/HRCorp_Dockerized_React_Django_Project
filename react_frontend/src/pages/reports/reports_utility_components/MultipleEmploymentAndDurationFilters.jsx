import PropTypes from "prop-types";
import DateSelector from "./DateSelectorComponent";

const MultipleEmploymentAndDurationFilters = ({
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

  selectedDuration,
  setSelectedDuration,

  selectedYear,
  setSelectedYear,
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

      <div className="my-6 flex justify-center items-center gap-2">
        {/* Select Option fields for filtering */}
        <DateSelector
          selectedDuration={selectedDuration}
          onChange={setSelectedDuration}
        />
        <input
          type="number"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          placeholder="Year"
          min="2022" // Setting up the minimum year
          max={new Date().getFullYear()} // Limit to the current year to block future year selection
          className="input input-bordered w-32 rounded-r-full"
        />
      </div>
    </div>
  );
};

MultipleEmploymentAndDurationFilters.propTypes = {
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

  selectedDuration: PropTypes.string.isRequired,
  setSelectedDuration: PropTypes.func.isRequired,

  selectedYear: PropTypes.number.isRequired,
  setSelectedYear: PropTypes.func.isRequired,
};

export default MultipleEmploymentAndDurationFilters;
