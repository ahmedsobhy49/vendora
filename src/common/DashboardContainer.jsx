import React from "react";

export default function DashboardContainer({ children }) {
  return (
    <div className="pt-28 lg:pt-32 pb-10 px-2 sm:px-4 md:px-6 lg:px-10 bg-slate-100 min-h-screen">
      {children}
    </div>
  );
}
