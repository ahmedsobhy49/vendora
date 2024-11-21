// icons
import { AiFillDashboard } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { BiSolidCategory } from "react-icons/bi";
import { MdPayments } from "react-icons/md";
import { BsChatTextFill } from "react-icons/bs";
import { MdDiscount } from "react-icons/md";
import { IoChatboxEllipses } from "react-icons/io5";
import { MdOutlineBorderColor } from "react-icons/md";

import { authService } from "../services/auth/auth";

const getRootPath = () => {
  const decodedToken = authService.decodeToken();
  if (decodedToken?.id) return `/seller/dashboard/${decodedToken?.id}`;
};

const sellerNavigation = () => {
  const rootPath = getRootPath();

  if (!rootPath) return []; // Return an empty array if the token or ID is not available

  return [
    {
      id: 0,
      icon: <AiFillDashboard />,
      path: `${rootPath}`,
      label: "Dashboard",
      role: "seller",
    },
    {
      id: 1,
      icon: <BsFillCartFill />,
      path: `${rootPath}/add-product`,
      label: "Add Product",
      role: "seller",
    },
    {
      id: 2,
      icon: <BiSolidCategory />,
      path: `${rootPath}/all-products`,
      label: "All Products",
      role: "seller",
    },
    {
      id: 3,
      icon: <MdDiscount />,
      path: `${rootPath}/discount-products`,
      label: "Discount Products",
      role: "seller",
    },
    {
      id: 4,
      icon: <MdOutlineBorderColor />,
      path: `${rootPath}/orders`,
      label: "Orders",
      role: "seller",
    },
    {
      id: 5,
      icon: <MdPayments />,
      path: `${rootPath}/payments`,
      label: "Payments",
      role: "seller",
    },
    {
      id: 6,
      icon: <BsChatTextFill />,
      path: `${rootPath}/chat-customer`,
      label: "Chat Customer",
      role: "seller",
    },
    {
      id: 7,
      icon: <IoChatboxEllipses />,
      path: `${rootPath}/chat-support`,
      label: "Chat Support",
      role: "seller",
    },
  ];
};

export default sellerNavigation;
