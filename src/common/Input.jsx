import React from "react";

const defaultInputClassName = `outline-none border-2 border-gray-300 rounded-md py-2 px-4 w-full text-[1rem] text-gray-700 focus:border-gray-400`;
const defaultLabelClassName = `text-gray-700 text-[1rem] font-bold`;

export default function Input({
  label = "",
  placeholder = "",
  labelClassName = defaultLabelClassName,
  inputClassName = defaultInputClassName,
  type,
  id,
  name,
  value,
  onBlur,
  onChange,
}) {
  return (
    <>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      )}
      <input
        placeholder={placeholder}
        name={name}
        id={id}
        type={type}
        value={value}
        className={inputClassName}
        onBlur={onBlur}
        onChange={onChange}
      />
    </>
  );
}
