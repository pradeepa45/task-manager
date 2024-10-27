import moment from "moment"

export function getPrettyDate (due:string) {
  if(due === '-') return "Select"
  const date = new Date(due);
  return date.toLocaleDateString();
};

export function getVerbalStatus (status: string) {
  if (status === "in_progress") return "In progress";
  if (status === "completed") return "Completed";
  if (status === "pending") return "Pending";
  else return 'All'
};

export function timeAgo(date:string) {
  return moment(date.split("-").join(""), "YYYYMMDD").fromNow()
}

export function createdAt(date:string) {
  const dateString = date.split("T")[0]
  return timeAgo(dateString)
}