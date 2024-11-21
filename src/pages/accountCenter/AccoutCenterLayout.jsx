// import React from "react";
// import { Link, Outlet } from "react-router-dom";
// import userNavigation from "../../navigation/user";
// import SidebarLink from "../../layouts/admin/sidebar/SidebarLink";
// import { authService } from "../../services/auth/auth";
// import AppContainer from "../../common/AppContainer";

// export default function AccoutCenterLayout() {
//   return (
//     <div className="relative ">
//       {/* Sidebar Navigation */}
//       <div className="hidden lg:flex flex-col space-y-4 lg:w-1/4 bg-red-50 bottom-0 top-0 h-full  left-0 absolute">
// <ul className="divide-y-2 ">
//   {userNavigation()?.map((page) => {
//     console.log(page.path);
//     return (
//       <SidebarLink to={page.path} key={page.id}>
//         <div className="flex items-center gap-4">
//           <span className="text-3xl">{page.icon}</span>
//           <p>{page.label}</p>
//         </div>
//       </SidebarLink>
//     );
//   })}
// </ul>
//         <button
//           className="text-start text-lg mt-10 px-4 text-gray-600"
//           onClick={authService.logout}
//         >
//           Sign out
//         </button>
//       </div>
//       {/* Content Section */}
// <div>
//   <Outlet />
// </div>
//     </div>
//   );
// }

import React from "react";
import { Link, Outlet } from "react-router-dom";
import userNavigation from "../../navigation/user";
import SidebarLink from "../../layouts/admin/sidebar/SidebarLink";
import { authService } from "../../services/auth/auth";
import AppContainer from "../../common/AppContainer";

export default function AccoutCenterLayout() {
  return (
    <div className="flex custom-user-layout-height">
      <aside className="lg:w-1/4 xl:w-1/5 bg-white p-6 absolute left-0  bottom-0 top-[133px] hidden lg:block ">
        <ul className=" flex flex-col gap-8">
          {userNavigation()?.map((page) => {
            console.log(page.path);
            return (
              <SidebarLink to={page.path} key={page.id}>
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{page.icon}</span>
                  <p>{page.label}</p>
                </div>
              </SidebarLink>
            );
          })}
        </ul>

        <button
          className="text-blue-500 mt-8 text-lg"
          onClick={authService.logout}
        >
          Sign out
        </button>
      </aside>
      <div className="w-full custom-user-layout-height  lg:w-3/4 lg:ms-auto xl:w-4/5">
        <Outlet />
      </div>
    </div>
  );
}
