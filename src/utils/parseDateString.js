import moment from "moment";

export function parseDateString(dateString) {
  return moment(dateString, "DD/MM/YYYY").toDate(); // Converts to JavaScript Date
}
