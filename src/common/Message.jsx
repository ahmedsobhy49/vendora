import React from "react";

export default function Message({ className, message, type }) {
  const defaultErrorClassName = `text-md ${
    type === "error" ? "text-red-500" : "text-green-500"
  } font-bold`;
  return (
    <>
      {message && (
        <p className={defaultErrorClassName || className}>{message}</p>
      )}
    </>
  );
}
