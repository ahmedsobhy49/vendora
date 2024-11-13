import React from "react";
import { Link } from "react-router-dom";

export default function AppLogo({ width = "15%", className = "" }) {
  return (
    <Link to={"/"}>
      <div
        className={className}
        style={{
          width: width,
          cursor: "pointer",
        }}
      >
        <img
          src="../../public/images/vendora.png"
          alt="vendora-logo"
          className="w-full"
        />
      </div>
    </Link>
  );
}
