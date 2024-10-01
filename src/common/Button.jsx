import React from "react";

const defaultButtonClassName = `bg-yellow-500 py-2 px-4 text-white font-bold rounded-md hover:bg-yellow-600 w-full`;
export default function Button({
  className = defaultButtonClassName,
  buttonText,
  onClick,
  type,
}) {
  return (
    <div>
      <button className={className} onClick={onClick} type={type}>
        {buttonText}
      </button>
    </div>
  );
}
