import React from "react";
import { useLocation } from "react-router-dom";
import DashboardContainer from "../../../../../common/DashboardContainer";
import Select from "../../../../../common/Select";
import { FaUserTie } from "react-icons/fa6";
import { FaShopLock } from "react-icons/fa6";

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
        <div className="grid gird-cols-1 xl:grid-cols-7 gap-4 sm:w-2/3 mx-auto md:w-full">
          <div className="col-span-1">
            <SellerImage image={image} />
          </div>
          <div className="xl:col-span-3">
            <SellerInfoCard
              name={name}
              email={email}
              role={role}
              status={status}
              paymentStatus={paymentStatus}
            />
          </div>
          <div className="xl:col-span-3">
            <ShopInfoCard
              shopName={shopName}
              district={district}
              division={division}
              state={state}
            />
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
}

function SellerImage({ image }) {
  return (
    <div className="w-40 mx-auto xl:w-auto">
      <img
        src={image}
        alt="seller-image"
        className="h-full w-full aspect-square rounded-full"
      />
    </div>
  );
}

function SellerInfoCard({ name, email, role, status, paymentStatus }) {
  return (
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6 flex items-center gap-4">
        <p>
          <FaUserTie size={15} color="#949494" />
        </p>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Seller Info</h3>
      </div>
      <div class="border-t border-gray-200">
        <dl>
          <div class="bg-gray-50 flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt class="text-sm sm:text-[1rem] font-medium text-gray-500">
              Name
            </dt>
            <dd class="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {name}
            </dd>
          </div>
          <div class="flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt class="text-sm sm:text-[1rem] font-medium text-gray-500">
              Email adress
            </dt>
            <dd class="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {email}
            </dd>
          </div>
          <div class="bg-gray-50 flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt class="text-sm sm:text-[1rem] font-medium text-gray-500">
              Role
            </dt>
            <dd class="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {role}
            </dd>
          </div>
          <div class="flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt class="text-sm sm:text-[1rem] font-medium text-gray-500">
              Status
            </dt>
            <dd class="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {status}
            </dd>
          </div>
          <div class="bg-gray-50 flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt class="text-sm sm:text-[1rem] font-medium text-gray-500">
              Payment status
            </dt>
            <dd class="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {paymentStatus}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function ShopInfoCard({ shopName, district, division, state }) {
  return (
    <div class="bg-white shadow overflow-hidden sm:rounded-lg min-h-full">
      <div class="px-4 py-5 sm:px-6 flex items-center gap-4">
        <p>
          <FaShopLock size={15} color="#949494" />
        </p>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Shop Info</h3>
      </div>
      <div class="border-t border-gray-200">
        <dl>
          <div class="bg-gray-50 flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt class="text-sm sm:text-[1rem] font-medium text-gray-500">
              Shop name
            </dt>
            <dd class="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {shopName}
            </dd>
          </div>
          <div class=" flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt class="text-sm sm:text-[1rem] font-medium text-gray-500">
              District
            </dt>
            <dd class="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {district}
            </dd>
          </div>
          <div class="bg-gray-50 flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt class="text-sm sm:text-[1rem] font-medium text-gray-500">
              Division
            </dt>
            <dd class="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {division}
            </dd>
          </div>
          <div class="flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt class="text-sm sm:text-[1rem] font-medium text-gray-500">
              State
            </dt>
            <dd class="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {state}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

// function SellerDetailRow({ label, value }) {
//   return (
//     <div className="flex flex-row lg:flex-col lg:items-start xl:flex-row gap-2 items-center xl:items-center justify-between xl:justify-between mx-auto w-11/12 ">
//       <p className="font-bold text-sm sm:text-[1rem] 2xl:text-[1.09rem]">
//         {label}:
//       </p>
//       <p className="text-xs sm:text-sm 2xl:text-lg w-1/2 text-right lg:text-start xl:text-end">
//         {value}
//       </p>
//     </div>
//   );
// }

// function SellerStatusForm({ status }) {
//   return (
//     <div className="w-full">
//       <Select options={["Active", "Deactive"]} placeholder={status} />
//       <button className="w-full p-2 bg-blue-500 text-white font-bold rounded-md mt-2">
//         Submit
//       </button>
//     </div>
//   );
// }

// export default function SellerDetails() {
// const {
//   image,
//   name,
//   email,
//   role,
//   paymentStatus,
//   status,
//   shopName,
//   district,
//   division,
//   state,
// } = useLocation().state;

//   return (
//     <DashboardContainer>
//       <div className="custom-hight lg:flex lg:justify-center lg:items-center">
//         <div className="grid grid-cols-1 lg:grid-cols-3 w-11/12 sm:w-10/12 md:w-10/12 lg:w-full gap-4 mx-auto ">
//           {/* first col */}
//           <SellerImage image={image} />

//           {/* second col */}
//           <div className="flex flex-col gap-2 h-full">
//             <div className="bg-white p-6 py-12 lg:py-6 xl:py-12 shadow-sm flex gap-4 flex-col rounded-md h-full justify-between">
//               <SellerDetailRow label="Name" value={name} />
//               <div className="h-[0.01rem] bg-slate-800">&nbsp;</div>
//               <SellerDetailRow label="Email" value={email} />
//               <div className="h-[0.01rem] bg-slate-800">&nbsp;</div>
//               <SellerDetailRow label="Role" value={role} />
//               <div className="h-[0.01rem] bg-slate-800">&nbsp;</div>
//               <SellerDetailRow label="Status" value={status} />
//               <div className="h-[0.01rem] bg-slate-800">&nbsp;</div>
//               <SellerDetailRow label="Payment Status" value={paymentStatus} />
//             </div>
//             <div className="hidden lg:block">
//               <Select options={["Active", "Deactive"]} placeholder={status} />
//             </div>
//           </div>

//           {/* third col */}
//           <div className="flex flex-col gap-2 h-full">
//             <div className="bg-white p-6 py-12 lg:py-6 xl:py-12 shadow-sm flex gap-4 flex-col rounded-md h-full justify-between">
//               <SellerDetailRow label="Shop Name" value={shopName} />
//               <div className="h-[0.01rem] bg-slate-800">&nbsp;</div>
//               <SellerDetailRow label="Division" value={division} />
//               <div className="h-[0.01rem] bg-slate-800">&nbsp;</div>
//               <SellerDetailRow label="District" value={district} />
//               <div className="h-[0.01rem] bg-slate-800">&nbsp;</div>
//               <SellerDetailRow label="State" value={state} />
//             </div>
//             <div>
//               <button className="w-full p-2 bg-blue-500 text-white font-bold rounded-md hidden lg:block">
//                 Submit
//               </button>
//             </div>
//           </div>

//           <div className="flex flex-col gap-2 lg:hidden">
//             <SellerStatusForm status={status} />
//           </div>
//         </div>
//       </div>
//     </DashboardContainer>
//   );
// }
