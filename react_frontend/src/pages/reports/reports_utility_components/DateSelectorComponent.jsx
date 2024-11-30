import PropTypes from "prop-types";

const DateSelector = ({ selectedDuration, onChange }) => {
  return (
    <div className="flex justify-center">
      <select
        value={selectedDuration}
        onChange={(e) => onChange(e.target.value)}
        className="select select-bordered w-full max-w-xs rounded-l-full"
      >
        <option value="this_month">This Month</option>
        <option value="last_month">Last Month</option>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
        <option value="1st_QTR">1st Quarter (Jan - Mar)</option>
        <option value="2nd_QTR">2nd Quarter (Apr - Jun)</option>
        <option value="3rd_QTR">3rd Quarter (Jul - Sep)</option>
        <option value="4th_QTR">4th Quarter (Oct - Dec)</option>
        <option value="1st_year_half">1st Half of the Year (Jan - Jun)</option>
        <option value="2nd_year_half">2nd Half of the Year (Jul - Dec)</option>
        <option value="Full_year">Full Year</option>
      </select>
    </div>
  );
};

DateSelector.propTypes = {
  selectedDuration: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DateSelector;
