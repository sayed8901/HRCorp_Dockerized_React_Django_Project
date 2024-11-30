import PropTypes from "prop-types";

const StatisticsCard = ({ title, data }) => {
  return (
    <div className="card bg-base-300 rounded-box flex-grow p-4 mb-4">
      <h3 className="text-lg font-semibold mb-4 pb-2 border-b-2 border-indigo-300">
        {title}
      </h3>
      <ul className="space-y-2">
        {/* map over 'Object.entries(departmentCount)', to only show the data which got any number count */}
        {/* "object.entries()" is used to convert the a object into an array of key-value pairs. So, we can access both the name and its count in each iteration. */}
        {Object.entries(data).map(([key, count]) => (
          <li
            key={key}
            className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm"
          >
            {/* Display the name */}
            <span>{key}</span>
            {/* Display the count of employees */}
            <span>{count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

StatisticsCard.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default StatisticsCard;
