import React from "react";
import TableContainer from "../../gen/TableContainer";
import TableBodyContainer from "../../gen/TableBodyContainer";
import DashboardContainer from "../../../../../common/DashboardContainer";

const PaymentRequestsData = [
  {
    id: 2344,
    ammout: 3243,
    requestStatus: "Pending",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 2344,
    ammout: 3243,
    requestStatus: "Pending",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 2344,
    ammout: 3243,
    requestStatus: "Pending",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 2344,
    ammout: 3243,
    requestStatus: "Pending",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 2344,
    ammout: 3243,
    requestStatus: "Pending",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 2344,
    ammout: 3243,
    requestStatus: "Pending",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 2344,
    ammout: 3243,
    requestStatus: "Pending",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 2344,
    ammout: 3243,
    requestStatus: "Pending",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 2344,
    ammout: 3243,
    requestStatus: "Pending",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 2344,
    ammout: 3243,
    requestStatus: "Pending",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 2344,
    ammout: 3243,
    requestStatus: "Pending",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 2344,
    ammout: 3243,
    requestStatus: "Pending",
    date: new Date().toLocaleDateString(),
  },
];

const isTherePaymentRequests = PaymentRequestsData?.length;
export default function PaymentRequest() {
  return (
    <DashboardContainer>
      <div>
        <TableHeader />
        <div className="bg-white h-[49.4rem] overflow-auto px-10">
          <TableContainer>
            <TableHead />
            <TableBodyContainer>
              {PaymentRequestsData.map((request) => {
                return (
                  <TableRow
                    requestId={request.id}
                    ammount={request.ammout}
                    date={request.date.toString()}
                    requestStatus={request.requestStatus}
                  />
                );
              })}
            </TableBodyContainer>
          </TableContainer>
        </div>
      </div>
    </DashboardContainer>
  );
}

function TableHeader() {
  return (
    <div className="flex items-center text-lg font-bold text-white justify-between p-4 py-4 lg:px-8 bg-[#338ffb] h-[64.5px]">
      <h3 className="tracking-wider">Withdrawal Requests </h3>
    </div>
  );
}

function TableHead() {
  return (
    <thead className="w-full text-gray-700 text-[0.7rem] sm:text-[0.75rem] md:text-[0.77rem] lg:text-sm tracking-tighter md:tracking-normal uppercase ">
      <tr>
        <th scope="col" className="py-4 sm:pt-4 text-center ">
          ID
        </th>
        <th scope="col" className="py-4 sm:pt-4 px-3 text-center">
          Ammount
        </th>
        <th scope="col" className="py-4 sm:pt-4 px-3  text-center">
          Request Status
        </th>
        <th scope="col" className="py-4 sm:pt-4 px-3 text-center">
          Date
        </th>
        <th scope="col" className="py-4 sm:pt-4  text-center">
          Action
        </th>
      </tr>
    </thead>
  );
}

function TableRow({ requestId, ammount, requestStatus, date }) {
  return (
    <tr className="xl:h-16 text-xs text-gray-700 md:text-sm xl:text-[1rem]">
      <td className="py-3 whitespace-nowrap font-bold text-gray-500 text-center">
        {requestId}
      </td>
      <td className="py-3 px-3 whitespace-nowrap text-center">${ammount}</td>
      <td
        className={`py-3 px-3 whitespace-nowrap text-center ${
          requestStatus === "Pending" ? "text-red-500" : ""
        }`}
      >
        {requestStatus}
      </td>
      <td className="py-3 px-3 whitespace-nowrap text-center">{date}</td>

      <td className=" py-3 whitespace-nowrap text-center">
        <button className="bg-green-400 text-white p-2 tracking-wide rounded-full">
          Confirm
        </button>
      </td>
    </tr>
  );
}
