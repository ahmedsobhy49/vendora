// icons

import { CgProfile } from "react-icons/cg";
import { GiSelfLove } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import { BsNewspaper } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { PiKeyReturnBold } from "react-icons/pi";

const userNavigation = () => {
  return [
    {
      id: 1,
      icon: <CgProfile />,
      path: `/account-center/profile`,
      label: "Profile",
      role: "user",
    },
    {
      id: 0,
      icon: <GiSelfLove />,
      path: `/account-center/wishlist`,
      label: "Wishlist",
      role: "user",
    },

    {
      id: 2,
      icon: <AiOutlineHome />,
      path: `/account-center/addresses`,
      label: "Addresses",
      role: "user",
    },
    {
      id: 3,
      icon: <BsNewspaper />,
      path: `/account-center/orders`,
      label: "Orders",
      role: "user",
    },
    {
      id: 4,
      icon: <MdOutlinePayments />,
      path: `/account-center/payments`,
      label: "Payments",
      role: "user",
    },
    {
      id: 5,
      icon: <PiKeyReturnBold />,
      path: `/account-center/returns`,
      label: "Returns",
      role: "user",
    },
  ];
};

export default userNavigation;
