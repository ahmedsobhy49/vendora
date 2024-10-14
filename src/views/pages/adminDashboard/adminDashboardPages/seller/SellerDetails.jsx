import React from "react";
import { useLocation } from "react-router-dom";
import DashboardContainer from "../../../../../common/DashboardContainer";
import Select from "../../../../../common/Select";
import { FaUserTie } from "react-icons/fa6";
import { FaShopLock } from "react-icons/fa6";
import { addresses } from "../../../../../data/adresses.json";
export default function SellerDetails() {
  const { _id, image, name, email, role, status, businessInfo, addressId } =
    useLocation().state;

  const sellerAddress = addresses.find(
    (address) => address.userId === addressId
  );

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
            />
          </div>
          <div className="xl:col-span-3">
            <ShopInfoCard
              shopName={businessInfo?.companyName}
              street={sellerAddress?.street}
              city={sellerAddress?.city}
              state={sellerAddress?.state}
              country={sellerAddress?.country}
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
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex items-center gap-4">
        <p>
          <FaUserTie size={15} color="#949494" />
        </p>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Seller Info
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
              Name
            </dt>
            <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {name}
            </dd>
          </div>
          <div className="flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
              Email adress
            </dt>
            <dd class="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {email}
            </dd>
          </div>
          <div className="bg-gray-50 flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
              Role
            </dt>
            <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {role}
            </dd>
          </div>
          <div className="flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
              Status
            </dt>
            <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {status}
            </dd>
          </div>
          <div className="bg-gray-50 flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
              Payment status
            </dt>
            <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {paymentStatus}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function ShopInfoCard({ shopName, district, division, state, country }) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg min-h-full">
      <div className="px-4 py-5 sm:px-6 flex items-center gap-4">
        <p>
          <FaShopLock size={15} color="#949494" />
        </p>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Shop Info
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
              Shop name
            </dt>
            <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {shopName}
            </dd>
          </div>
          <div className=" flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
              District
            </dt>
            <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {district}
            </dd>
          </div>
          <div className="bg-gray-50 flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
              Division
            </dt>
            <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {division}
            </dd>
          </div>
          <div className="flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
              State
            </dt>
            <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {state}
            </dd>
          </div>
          <div className="bg-gray-50 flex items-center justify-between px-4 py-4 lg:py-5 lg:grid lg:grid-cols-3 lg:gap-4 lg:px-6">
            <dt className="text-sm sm:text-[1rem] font-medium text-gray-500">
              Country
            </dt>
            <dd className="capitalize text-sm sm:text-[1rem] text-gray-900 sm:col-span-2">
              {country}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
