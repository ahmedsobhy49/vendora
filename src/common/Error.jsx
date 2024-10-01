import React from "react";

const defaultErrorClassName = `text-xs text-red-500 font-bold`;

export default function Error({
  className = defaultErrorClassName,
  errorMessage,
  touched,
}) {
  return (
    <>
      {errorMessage && touched && <p className={className}>{errorMessage}</p>}
    </>
  );
}
