import React from "react";

const defaultClassName = `text-center text-gray-400 py-10 text-xs sm:text-sm`;

export default function NoDataMessage({
  message,
  className = defaultClassName,
}) {
  return <h4 className={className}>{message}</h4>;
}
