import React from "react";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { IoCall } from "react-icons/io5";

function SummaryCard({ children, count, title }) {
  return (
    <div className="h-36 md:h-44 lg:h-52 bg-white shadow-md flex justify-between items-center px-5 ">
      <div>
        <strong className="text-lg sm:text-xl md:text-3xl xl:text-xl xl:font-extrabold">
          {count}
        </strong>
        <p className="text-sm mt-1 md:text-lg xl:text-[1rem]">{title}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default function Summaries() {
  return (
    <div className=" grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-1 text-black ">
      <SummaryCard title={"Total Sales"} count={"1000"}>
        <FaFileInvoiceDollar
          color="green"
          className="text-[3rem] sm:text-[4rem] md:text-[6rem] xl:text-[4.5rem]"
        />
      </SummaryCard>

      <SummaryCard title={"Products"} count={"20"}>
        <MdProductionQuantityLimits
          color="#f15313"
          className="text-[3rem] sm:text-[4rem] md:text-[6rem] xl:text-[4.5rem]"
        />
      </SummaryCard>

      <SummaryCard title={"Sellers"} count={"50"}>
        <FaUserTie
          color="#172554"
          className="text-[3rem] sm:text-[4rem] md:text-[6rem] xl:text-[4.5rem]"
        />
      </SummaryCard>
      <SummaryCard title={"Orders"} count={"$9485"}>
        <IoCall
          color="#feb019"
          className="text-[3rem] sm:text-[4rem] md:text-[6rem] xl:text-[4.5rem]"
        />
      </SummaryCard>
    </div>
  );
}
