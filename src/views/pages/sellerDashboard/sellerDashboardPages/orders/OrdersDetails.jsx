import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardContainer from "../../../../../common/DashboardContainer";
import { LiaShippingFastSolid } from "react-icons/lia";
import formatName from "../../../../../utils/formatName";
import getAddressByUserId from "../../../../../services/address/getAdressByUserId";
import createStatusClasses from "../../../../../utils/createStatusClasses";
export default function OrderDetails() {
  const order = useLocation().state;
  const [userAddress, setUserAddress] = useState(null);
  console.log(order);
  console.log(userAddress);
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const userAddress = await getAddressByUserId(order?.user?._id);
        setUserAddress(userAddress);
      } catch (error) {
        console.error("Failed to fetch user address:", error);
      }
    };

    if (order?.user?._id) {
      fetchAddress(); // Call the async function
    }
  }, [order]); // Depend on 'order' instead of 'location'

  return (
    <DashboardContainer>
      <div className="grid grid-cols-1 gap-6">
        <div className="xl:grid xl:grid-cols-3 gap-4">
          {/* order details  */}
          <div className=" bg-white p-6 xl:col-span-2 ">
            <OrderInfo order={order} />
            {/* products */}
            <div>
              <h4 className="text-gray-400 text-sm sm:text-[1rem] font-bold mb-6">
                Products
              </h4>
              <div className="max-h-[15rem] overflow-auto">
                <div>
                  {order.sellers[0]?.items?.map((product) => {
                    return (
                      <div
                        key={product._id}
                        className="flex items-center gap-10 md:gap-16 mb-4"
                      >
                        <ProductImage
                          src={`http://localhost:8000${product?.product?.productImages[0]?.url}`}
                        />
                        <div>
                          <ProductName title={product?.product?.name} />

                          <ProductDetailContainer>
                            <ProductDetailTitle title={"Price"} />
                            <ProductDetailData data={product?.product?.price} />
                          </ProductDetailContainer>

                          <ProductDetailContainer>
                            <ProductDetailTitle title={"Quantity"} />
                            <ProductDetailData data={product?.quantity} />
                          </ProductDetailContainer>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden xl:grid xl:grid-cols-1 xl:grid-rows-2 xl:gap-4">
            <DeliverdTo order={order} />
            <ShippingAdress userAddress={userAddress} />
          </div>
        </div>
        {/* user details  */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-1 xl:hidden">
          <DeliverdTo order={order} />

          {/* shipping details  */}
          <ShippingAdress userAddress={userAddress} />
        </div>
      </div>
    </DashboardContainer>
  );
}

function DetailTitle({ title }) {
  return (
    <h5 className="font-bold text-sm sm:text-[0.95rem] text-gray-600">
      {title}
    </h5>
  );
}

function DetailData({ data }) {
  return (
    <p
      className={`text-xs sm:text-sm  p-2 rounded-lg ${createStatusClasses(
        data
      )}`}
    >
      {data}
    </p>
  );
}
function DetailContainer({ children }) {
  return <div className="flex items-center justify-between">{children}</div>;
}

function ProductDetailTitle({ title }) {
  return <h5 className="text-gray-500 text-sm font-bold">{title}:</h5>;
}
function ProductDetailData({ data }) {
  return <p className="text-gray-600 text-xs sm:text-sm capitalize">{data}</p>;
}
function ProductDetailContainer({ children }) {
  return <div className="flex items-center gap-2">{children}</div>;
}

function MainHeading({ title }) {
  return <h3 className="text-gray-400 text-lg font-extrabold mb-6">{title}</h3>;
}

function ProductName({ title }) {
  return (
    <div className="flex items-center mb-2">
      <h5 className="text-gray-500 text-sm sm:text-[1rem] font-extrabold">
        {title}
      </h5>
    </div>
  );
}

function ProductImage({ src }) {
  return (
    <div className="w-28">
      <img
        src={src}
        alt="product image"
        className="w-full h-full aspect-square"
      />
    </div>
  );
}

function ShippingAdress({ userAddress }) {
  return (
    <div className="bg-white p-6">
      <MainHeading title={"Shipping Addsress"} />
      <div className="flex items-center justify-between">
        <div>
          <p className="flex items-center gap-1">
            <span>{userAddress?.buildingNumber},</span>
            <span className="capitalize">{userAddress?.street} ST.</span>
          </p>
          <p className="uppercase">{userAddress?.state}, </p>
          <p className="uppercase">{userAddress?.country}</p>
        </div>
        <div>
          <LiaShippingFastSolid size={130} color="#e2e8f0" />
        </div>
      </div>
    </div>
  );
}

function DeliverdTo({ order }) {
  return (
    <div className="bg-white p-6">
      <MainHeading title={"Deliverd To"} />
      <div className="grid gird-cols-1 gap-4">
        <DetailContainer>
          <DetailTitle title={"Name"} />
          <DetailData
            data={formatName(order?.user?.firstName, order?.user?.lastName)}
          />
        </DetailContainer>

        <DetailContainer>
          <DetailTitle title={"Email"} />
          <DetailData data={order.user.email} />
        </DetailContainer>

        <DetailContainer>
          <DetailTitle title={"Phone"} />
          <DetailData data={order?.user?.phone} />
        </DetailContainer>
      </div>
    </div>
  );
}

function OrderInfo({ order }) {
  return (
    <>
      <MainHeading title={"Order Details"} />
      <div className="grid gird-cols-1 gap-2 mb-8">
        <DetailContainer>
          <DetailTitle title={"Order Id"} />
          <DetailData data={`#${order?.orderId}`} />
        </DetailContainer>

        <DetailContainer>
          <DetailTitle title={"Order Date"} />
          <DetailData data={order?.createdAt} />
        </DetailContainer>

        <DetailContainer>
          <DetailTitle title={"Total Price"} />
          <DetailData data={`$${order?.sellers[0]?.totalPrice}`} />
        </DetailContainer>

        <DetailContainer>
          <DetailTitle title={"Payment Status"} />
          <DetailData data={order.paymentStatus} />
        </DetailContainer>
      </div>
    </>
  );
}
