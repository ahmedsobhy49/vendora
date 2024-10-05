// icons
import { AiFillDashboard } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { BiSolidCategory } from "react-icons/bi";
import { PiUsersThreeFill } from "react-icons/pi";
import { MdPayments } from "react-icons/md";
import { FaUserXmark, FaCodePullRequest } from "react-icons/fa6";
import { BsChatTextFill } from "react-icons/bs";

const adminNavigation = [
  {
    id: 0,
    icon: <AiFillDashboard />,
    path: "/admin/dashboard",
    label: "Dashboard",
    role: "admin",
  },
  {
    id: 1,
    icon: <BsFillCartFill />,
    path: "/admin/dashboard/orders",
    label: "Orders",
    role: "admin",
  },
  {
    id: 2,
    icon: <BiSolidCategory />,
    path: "/admin/dashboard/category",
    label: "Category",
    role: "admin",
  },
  {
    id: 3,
    icon: <PiUsersThreeFill />,
    path: "/admin/dashboard/sellers",
    label: "Sellers",
    role: "admin",
  },
  {
    id: 4,
    icon: <MdPayments />,
    path: "/admin/dashboard/payment-request",
    label: "Payment Request",
    role: "admin",
  },
  {
    id: 5,
    icon: <FaUserXmark />,
    path: "/admin/dashboard/deactive-seller",
    label: "Deactive Sellers",
    role: "admin",
  },
  {
    id: 6,
    icon: <FaCodePullRequest />,
    path: "/admin/dashboard/sellers-request",
    label: "Sellers Request",
    role: "admin",
  },
  {
    id: 7,
    icon: <BsChatTextFill />,
    path: "/admin/dashboard/chat-seller",
    label: "Live Chat",
    role: "admin",
  },
];

export default adminNavigation;
