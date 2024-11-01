import moment from "moment";

export default function isValidDate(dateString) {
  return moment(dateString, "DD/MM/YYYY", true).isValid(); // Strict mode
}
