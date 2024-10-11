import React from "react";
import TableContainer from "../../gen/TableContainer";
import TableBodyContainer from "../../gen/TableBodyContainer";
import DashboardContainer from "../../../../../common/DashboardContainer";
import TableHeadContainer from "../../gen/TableHeadContainer";

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
        <div className="bg-white table-custom-hight overflow-auto hide-scrollbar">
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
    <div className="bg-[#338ffb] h-[65px] flex items-center p-4 lg:px-8 text-white">
      <h3 className="text-[0.95rem] sm:text-[1.1rem] md:tracking-wide font-bold">
        Withdrawal Requests
      </h3>
    </div>
  );
}

function TableHead() {
  return (
    <TableHeadContainer>
      <tr>
        <th scope="col" className="py-4 sm:pt-4 text-center">
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
    </TableHeadContainer>
  );
}

function TableRow({ requestId, ammount, requestStatus, date }) {
  return (
    <tr className="xl:h-16 text-xs text-gray-700 md:text-sm xl:text-[1rem] even:bg-slate-50">
      <td className="py-3 px-3 whitespace-nowrap font-bold text-gray-500 text-center">
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

      <td className=" py-3  px-3  whitespace-nowrap text-center">
        <button className="bg-green-400 text-white p-2 tracking-wide rounded-full">
          Confirm
        </button>
      </td>
    </tr>
  );
}
