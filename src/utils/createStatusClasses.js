export default function createStatusClasses(state) {
  switch (state?.toLowerCase()) {
    case "pending":
      return "bg-[#FEF2E5] text-[#CD6200]";
    case "deactive":
      return "bg-[#FBE7E8] text-[#A30D11]";
    case "active":
      return "bg-[#EBF9F1] text-[#1F9254]";
    default:
      return "";
  }
}
