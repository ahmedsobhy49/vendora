import React from "react";

export default function TableBodyContainer({ children }) {
  return (
    <tbody className="divide-y divide-gray-300">
      {children}
      {/* <tr>
        <td colSpan="100%" className="border-t border-gray-300"></td>
      </tr> */}
    </tbody>
  );
}
