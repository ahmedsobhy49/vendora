import React from "react";
import { useLocation } from "react-router-dom";
import DashboardContainer from "../../../../../common/DashboardContainer";
import { LiaShippingFastSolid } from "react-icons/lia";

export default function OrderDetails() {
  const order = useLocation().state;

  const allSellers = order.fromSellers.filter((seller) => {
    return seller;
  });

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
                {allSellers.map((seller) => {
                  return (
                    <div key={seller.id}>
                      <div>
                        {seller.products.map((product) => {
                          return (
                            <div
                              key={product.id}
                              className="flex items-center gap-10 md:gap-16 mb-4"
                            >
                              <ProductImage src={product.image} />
                              <div>
                                <ProductName title={product.name} />
                                <ProductDetailContainer>
                                  <ProductDetailTitle title={"Seller"} />
                                  <ProductDetailData data={seller.shopName} />
                                </ProductDetailContainer>

                                <ProductDetailContainer>
                                  <ProductDetailTitle title={"Price"} />
                                  <ProductDetailData data={product.price} />
                                </ProductDetailContainer>

                                <ProductDetailContainer>
                                  <ProductDetailTitle title={"Quantity"} />
                                  <ProductDetailData data={product.quantity} />
                                </ProductDetailContainer>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="hidden xl:grid xl:grid-cols-1 xl:grid-rows-2 xl:gap-4">
            <DeliverdTo order={order} />
            <ShippingAdress order={order} />
          </div>
        </div>
        {/* user details  */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-1 xl:hidden">
          <DeliverdTo order={order} />

          {/* shipping details  */}
          <ShippingAdress order={order} />
        </div>
        {/* seller details  */}
        <SellerDetails allSellers={allSellers} />
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
  return <p className="text-gray-600 text-xs sm:text-sm">{data}</p>;
}
function DetailContainer({ children }) {
  return <div className="flex items-center justify-between">{children}</div>;
}

function ProductDetailTitle({ title }) {
  return <h5 className="text-gray-500 text-sm font-bold">{title}:</h5>;
}
function ProductDetailData({ data }) {
  return <p className="text-gray-600 text-xs sm:text-sm">{data}</p>;
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

function SellerDetails({ allSellers }) {
  return (
    <div className="bg-white p-6">
      <MainHeading title={"Sellers"} />
      <div className="max-h-[25rem] overflow-auto">
        {allSellers.map((seller, index) => {
          return (
            <div className="mb-10 last:mb-0" key={seller.id}>
              <DetailContainer>
                <DetailTitle title={`${index + 1}-${seller.shopName}`} />
              </DetailContainer>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {seller.products.map((product) => {
                  return (
                    <div
                      key={product.id}
                      className="flex items-start gap-10 sm:gap-6 md:gap-10 2xl:gap-4  my-4"
                    >
                      <ProductImage src={product.image} />
                      <div>
                        <ProductName title={product.name} />

                        <ProductDetailContainer>
                          <ProductDetailTitle title={"Price"} />
                          <ProductDetailData data={product.price} />
                        </ProductDetailContainer>

                        <ProductDetailContainer>
                          <ProductDetailTitle title={"Quantity"} />
                          <ProductDetailData data={product.quantity} />
                        </ProductDetailContainer>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ShippingAdress({ order }) {
  return (
    <div className="bg-white p-6">
      <MainHeading title={"Shipping Addsress"} />
      <div className="flex items-center justify-between">
        <div>
          <p>
            <span>{order.toUser.address.apartment}</span>
            <span>{order.toUser.address.street}</span>
          </p>
          <p>{order.toUser.address.state} </p>
          <p>{order.toUser.address.country}</p>
        </div>
        <div>
          <LiaShippingFastSolid size={130} color="#9ca3af" />
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
          <DetailData data={order.toUser.name} />
        </DetailContainer>

        <DetailContainer>
          <DetailTitle title={"Email"} />
          <DetailData data={order.toUser.contant.email} />
        </DetailContainer>

        <DetailContainer>
          <DetailTitle title={"Phone"} />
          <DetailData data={order.toUser.contant.phone} />
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
          <DetailData data={order.id} />
        </DetailContainer>

        <DetailContainer>
          <DetailTitle title={"Order Date"} />
          <DetailData data={order.orderDate} />
        </DetailContainer>

        <DetailContainer>
          <DetailTitle title={"Total Price"} />
          <DetailData data={`$${order.totalPrice}`} />
        </DetailContainer>

        <DetailContainer>
          <DetailTitle title={"Payment Status"} />
          <DetailData data={order.paymentStatus} />
        </DetailContainer>
      </div>
    </>
  );
}
