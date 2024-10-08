import React from "react";
import { useLocation } from "react-router-dom";
import DashboardContainer from "../../../../../common/DashboardContainer";
import Select from "../../../../../common/Select";

function SellerImage({ image }) {
  return (
    <div className="2xl:w-[400px] 2xl:h-[400px] ">
      <img
        src={image}
        alt="seller-image"
        className="h-full w-9/12 sm:w-6/12 md:w-9/12 lg:w-full lg:h-3/4 xl:h-full rounded-md mx-auto"
      />
    </div>
  );
}

function SellerDetailRow({ label, value }) {
  return (
    <div className="flex flex-row lg:flex-col lg:items-start xl:flex-row gap-2 items-center xl:items-center justify-between xl:justify-between mx-auto w-11/12 ">
      <p className="font-bold text-sm sm:text-[1rem] 2xl:text-[1.09rem]">
        {label}:
      </p>
      <p className="text-xs sm:text-sm 2xl:text-lg w-1/2 text-right lg:text-start xl:text-end">
        {value}
      </p>
    </div>
  );
}

function SellerStatusForm({ status }) {
  return (
    <div className="w-full">
      <Select options={["Active", "Deactive"]} placeholder={status} />
      <button className="w-full p-2 bg-blue-500 text-white font-bold rounded-md mt-2">
        Submit
      </button>
    </div>
  );
}

export default function SellerDetails() {
  const {
    image,
    name,
    email,
    role,
    paymentStatus,
    status,
    shopName,
    district,
    division,
    state,
  } = useLocation().state;

  return (
    <DashboardContainer>
      <div className="custom-hight lg:flex lg:justify-center lg:items-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 w-11/12 sm:w-10/12 md:w-10/12 lg:w-full gap-4 mx-auto ">
          {/* first col */}
          <SellerImage image={image} />

          {/* second col */}
          <div className="flex flex-col gap-2 h-full">
            <div className="bg-white p-6 py-12 lg:py-6 xl:py-12 shadow-sm flex gap-4 flex-col rounded-md h-full justify-between">
              <SellerDetailRow label="Name" value={name} />
              <div className="h-[0.01rem] bg-slate-800">&nbsp;</div>
              <SellerDetailRow label="Email" value={email} />
              <div className="h-[0.01rem] bg-slate-800">&nbsp;</div>
              <SellerDetailRow label="Role" value={role} />
              <div className="h-[0.01rem] bg-slate-800">&nbsp;</div>
              <SellerDetailRow label="Status" value={status} />
              <div className="h-[0.01rem] bg-slate-800">&nbsp;</div>
              <SellerDetailRow label="Payment Status" value={paymentStatus} />
            </div>
            <div className="hidden lg:block">
              <Select options={["Active", "Deactive"]} placeholder={status} />
            </div>
          </div>

          {/* third col */}
          <div className="flex flex-col gap-2 h-full">
            <div className="bg-white p-6 py-12 lg:py-6 xl:py-12 shadow-sm flex gap-4 flex-col rounded-md h-full justify-between">
              <SellerDetailRow label="Shop Name" value={shopName} />
              <div className="h-[0.01rem] bg-slate-800">&nbsp;</div>
              <SellerDetailRow label="Division" value={division} />
              <div className="h-[0.01rem] bg-slate-800">&nbsp;</div>
              <SellerDetailRow label="District" value={district} />
              <div className="h-[0.01rem] bg-slate-800">&nbsp;</div>
              <SellerDetailRow label="State" value={state} />
            </div>
            <div>
              <button className="w-full p-2 bg-blue-500 text-white font-bold rounded-md hidden lg:block">
                Submit
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 lg:hidden">
            <SellerStatusForm status={status} />
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
}
