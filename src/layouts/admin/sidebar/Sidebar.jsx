import SidebarMenu from "./SidebarMenu";

export default function Sidebar({ showSideBar, setShowSideBar }) {
  return (
    <div>
      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-40 h-screen transition-transform 
          ${
            showSideBar
              ? "translate-x-0 w-3/4 sm:w-1/2 md:translate-x-0"
              : "-translate-x-full md:translate-x-0"
          } 
          w-1/3 md:w-[30%] lg:w-1/4 xl:w-1/5`}
      >
        <div className="h-full px-3 py-6 md:py-10 overflow-y-auto bg-white shadow-2xl">
          <SidebarMenu setShowSideBar={setShowSideBar} />
        </div>
      </aside>
    </div>
  );
}
