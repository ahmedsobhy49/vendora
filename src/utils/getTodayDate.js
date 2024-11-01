export default function getTodayDate() {
  const today = new Date();
  console.log(today);
  console.log(today.setHours(0, 0, 0, 0));
  return today.setHours(0, 0, 0, 0); // Set time to midnight for comparison
}
