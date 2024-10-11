// icons
import { AiFillDashboard } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { BiSolidCategory } from "react-icons/bi";
import { MdPayments } from "react-icons/md";
import { BsChatTextFill } from "react-icons/bs";
import { MdDiscount } from "react-icons/md";
import { IoChatboxEllipses } from "react-icons/io5";
import { MdOutlineBorderColor } from "react-icons/md";

const sellerNavigation = [
  {
    id: 0,
    icon: <AiFillDashboard />,
    path: "/seller/dashboard",
    label: "Dashboard",
    role: "seller",
  },
  {
    id: 1,
    icon: <BsFillCartFill />,
    path: "/seller/dashboard/add-product",
    label: "Add Product",
    role: "seller",
  },
  {
    id: 2,
    icon: <BiSolidCategory />,
    path: "/seller/dashboard/all-products",
    label: "All Products",
    role: "seller",
  },
  {
    id: 3,
    icon: <MdDiscount />,
    path: "/seller/dashboard/discount-products",
    label: "Discount Products",
    role: "seller",
  },
  {
    id: 4,
    icon: <MdOutlineBorderColor />,
    path: "/seller/dashboard/orders",
    label: "Orders",
    role: "seller",
  },
  {
    id: 5,
    icon: <MdPayments />,
    path: "/seller/dashboard/payments",
    label: "Payments",
    role: "seller",
  },
  {
    id: 6,
    icon: <BsChatTextFill />,
    path: "/seller/dashboard/chat-customer",
    label: "Chat Customer",
    role: "seller",
  },
  {
    id: 7,
    icon: <IoChatboxEllipses />,
    path: "/seller/dashboard/chat-support",
    label: "Chat support",
    role: "seller",
  },
];

export default sellerNavigation;
