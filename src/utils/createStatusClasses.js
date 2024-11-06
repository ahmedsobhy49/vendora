export default function createStatusClasses(state) {
  const statusClasses = {
    pending: "bg-[#FEF2E5] text-[#CD6200]",
    shipped: "bg-[#FBE7E8] text-[#A30D11]",
    "out for delivery": "bg-[#FBE7E8] text-[#A30D11]",
    delivered: "bg-[#EBF9F1] text-[#1F9254]",
    canceled: "bg-[#FBE7E8] text-[#A30D11]",
    paid: "bg-[#E0F7FA] text-[#00796B]", // Added styling for Paid
    refunded: "bg-[#FFEBEE] text-[#D32F2F]", // Added styling for Refunded
    inactive: "bg-[#FBE7E8] text-[#A30D11]", // Added styling for Deactive
    active: "bg-[#EBF9F1] text-[#1F9254]", // Added styling for Active
  };

  return statusClasses[state?.toLowerCase()] || "";
}
