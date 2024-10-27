import React from "react";

export default function AppLogo({ width = "15%", className = "" }) {
  return (
    <div
      className={className}
      style={{
        width: width,
      }}
    >
      <img src="../../public/images/vendora.png" alt="vendora-logo" />
    </div>
  );
}
