// icons
import { AiFillDashboard } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { BiSolidCategory } from "react-icons/bi";
import { PiUsersThreeFill } from "react-icons/pi";
import { MdPayments } from "react-icons/md";
import { FaUserXmark, FaCodePullRequest } from "react-icons/fa6";
import { BsChatTextFill } from "react-icons/bs";
import { TbCircleLetterBFilled } from "react-icons/tb";
import { authService } from "../services/auth/auth";

const getRootPath = () => {
  const decodedToken = authService.decodeToken();
  if (decodedToken?.id) return `/admin/dashboard/${decodedToken?.id}`;
};

const adminNavigation = () => {
  const rootPath = getRootPath();

  if (!rootPath) return []; // Return an empty array if the token or ID is not available

  return [
    {
      id: 0,
      icon: <AiFillDashboard />,
      path: `${rootPath}`,
      label: "Dashboard",
      role: "admin",
    },
    {
      id: 1,
      icon: <BsFillCartFill />,
      path: `${rootPath}/orders`,
      label: "Orders",
      role: "admin",
    },
    {
      id: 2,
      icon: <BiSolidCategory />,
      path: `${rootPath}/category`,
      label: "Categories",
      role: "admin",
    },
    {
      id: 3,
      icon: <TbCircleLetterBFilled />,
      path: `${rootPath}/top-brands`,
      label: "Top Brands",
      role: "admin",
    },
    {
      id: 4,
      icon: <PiUsersThreeFill />,
      path: `${rootPath}/sellers`,
      label: "Sellers",
      role: "admin",
    },
    {
      id: 5,
      icon: <MdPayments />,
      path: `${rootPath}/payment-request`,
      label: "Payment Request",
      role: "admin",
    },
    {
      id: 6,
      icon: <FaUserXmark />,
      path: `${rootPath}/deactive-seller`,
      label: "Inactive Sellers",
      role: "admin",
    },
    {
      id: 7,
      icon: <FaCodePullRequest />,
      path: `${rootPath}/sellers-request`,
      label: "Sellers Request",
      role: "admin",
    },
    {
      id: 8,
      icon: <BsChatTextFill />,
      path: `${rootPath}/chat-seller`,
      label: "Live Chat",
      role: "admin",
    },
  ];
};

export default adminNavigation;
