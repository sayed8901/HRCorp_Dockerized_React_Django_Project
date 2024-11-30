import PropTypes from "prop-types";

const TransferTable = ({
  filteredTransfers,
  employeeData,
  user_type,
  handleOpenTransferUpdateModal,
  handleWithdrawTransfer,
  isTransferNotOutdated,
  all_transfers,
}) => {
  // Helper function to format date into dd-mm-yyy form
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  return (
    <div className="overflow-x-auto w-11/12 mx-auto mt-10 mb-16">
      <table className="table table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th className="border border-gray-300">Transfer ID</th>
            <th className="border border-gray-300">Employee ID</th>
            <td className="border border-gray-300">Name</td>
            <td className="border border-gray-300">Designation</td>

            <td className="border border-gray-300">Transfer from location</td>
            <td className="border border-gray-300">Transfer to location</td>
            <td className="border border-gray-300">Transfer from department</td>
            <td className="border border-gray-300">Transfer to department</td>
            <td className="border border-gray-300">Effective date</td>

            <th className="border border-gray-300">Transfer Update/ cancel</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransfers &&
            filteredTransfers?.map((transferData, index) => {
              const employee_id = transferData?.employee;
              const employeeInfo = employeeData[employee_id] || {};
              const name = employeeInfo?.personalData?.name || "Loading...";
              const designation =
                employeeInfo?.employmentData?.designation || "Loading...";

              return (
                <tr
                  key={transferData?.id}
                  // here, length - 1 is used not to apply bottom border for the very last line of the table
                  className={`hover ${
                    index < all_transfers.length - 1
                      ? "border-b-2 border-indigo-300"
                      : ""
                  }`}
                >
                  <th className="border border-gray-300">{transferData?.id}</th>
                  <th className="border border-gray-300">{employee_id}</th>
                  <td className="border border-gray-300">{name}</td>
                  <td className="border border-gray-300">{designation}</td>

                  <td className="border border-gray-300">
                    {transferData?.transfer_from_location}
                  </td>
                  <td className="border border-gray-300">
                    {transferData?.transfer_to_location}
                  </td>
                  <td className="border border-gray-300">
                    {transferData?.transfer_from_department}
                  </td>
                  <td className="border border-gray-300">
                    {transferData?.transfer_to_department}
                  </td>
                  <td className="border border-gray-300">
                    {formatDate(transferData?.transfer_effective_date)}
                  </td>

                  {/* Checking if transfer is not outdated and if the user is power_user */}
                  {isTransferNotOutdated(
                    transferData?.transfer_effective_date
                  ) ? (
                    <>
                      {user_type === "power_user" ? (
                        <th className="border border-gray-300 flex flex-col gap-2 items-center">
                          <button
                            className="btn btn-xs btn-outline btn-accent w-32"
                            onClick={() =>
                              handleOpenTransferUpdateModal(transferData)
                            }
                          >
                            Update Transfer
                          </button>
                          <button
                            className="btn btn-xs btn-outline btn-secondary"
                            onClick={() =>
                              handleWithdrawTransfer(
                                transferData.employee,
                                transferData.id
                              )
                            }
                          >
                            Withdraw Transfer
                          </button>
                        </th>
                      ) : (
                        <th className="border border-gray-300">
                          <div className="text-xsm text-center border border-blue-300 rounded-lg font-normal px-2 py-1">
                            N/A (Only power user can perform update / delete)
                          </div>
                        </th>
                      )}
                    </>
                  ) : (
                    <th className="border border-gray-300 flex flex-col items-center">
                      <div className="text-xsm text-center border border-red-300 rounded-lg font-normal px-2 py-1">
                        N/A (This Transfer is Already Expired)
                      </div>
                    </th>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

TransferTable.propTypes = {
  filteredTransfers: PropTypes.array,
  employeeData: PropTypes.object.isRequired,
  user_type: PropTypes.string.isRequired,
  handleOpenTransferUpdateModal: PropTypes.func.isRequired,
  handleWithdrawTransfer: PropTypes.func.isRequired,
  isTransferNotOutdated: PropTypes.func.isRequired,
  all_transfers: PropTypes.array,
};

export default TransferTable;
