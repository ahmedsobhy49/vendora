import React from "react";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { IoCall } from "react-icons/io5";

function SummaryCard({ children, count, title }) {
  return (
    <div className="h-36 md:h-44 lg:h-52 bg-white shadow-md flex justify-between items-center px-5 ">
      <div>
        <p className="text-sm mt-1 md:text-lg font-bold text-gray-600 xl:text-[1.2rem]">
          {title}
        </p>
        <strong className="text-lg sm:text-xl md:text-3xl xl:text-xl xl:font-extrabold">
          {count}
        </strong>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default function Summaries({
  yearOrdersStatistics,
  productsCount,
  activeSellers,
}) {
  const currentMonthStatistics = yearOrdersStatistics?.monthlyStats?.filter(
    (month) => month.current === true
  )[0];

  return (
    <div className=" grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-1 text-black ">
      <SummaryCard
        title={`${currentMonthStatistics?.monthName} Total Sales`}
        count={`$${currentMonthStatistics?.totalSales}`}
      >
        <FaFileInvoiceDollar
          color="#10a66c"
          className="text-[3rem] sm:text-[4rem] md:text-[6rem] xl:text-[4.5rem]"
        />
      </SummaryCard>
      <SummaryCard title={"Total Products"} count={productsCount || 0}>
        <MdProductionQuantityLimits
          color="#f15313"
          className="text-[3rem] sm:text-[4rem] md:text-[6rem] xl:text-[4.5rem]"
        />
      </SummaryCard>
      <SummaryCard title={"Active Sellers"} count={activeSellers}>
        <FaUserTie
          color="#172554"
          className="text-[3rem] sm:text-[4rem] md:text-[6rem] xl:text-[4.5rem]"
        />
      </SummaryCard>
      <SummaryCard
        title={`${currentMonthStatistics?.monthName} Orders`}
        count={currentMonthStatistics?.totalOrders}
      >
        <IoCall
          color="#feb019"
          className="text-[3rem] sm:text-[4rem] md:text-[6rem] xl:text-[4.5rem]"
        />
      </SummaryCard>
    </div>
  );
}
