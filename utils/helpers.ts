/**
 * computes the number of days between two dates  
 * computed by subtracting first from second
 */
export function datediff(first: Date, second: Date) {
  return Math.round(
    (second.getTime() - first.getTime()) / (1000 * 60 * 60 * 24)
  );
}
  
/**
 * Returns the date fomatted as `month day, year`
 * Example: `new Date("01-09-2024")` -> January 09, 2024
 */
export function getFormattedDate(date: Date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = date.getDate().toString().padStart(2, "0");
  let month = months[date.getMonth()];
  let year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}
  
/**
 * returns a comparison against the current date
 */
export function getShortAge(date: Date) {
  let currentDate = new Date();

  let years = currentDate.getFullYear() - date.getFullYear();
  let months = currentDate.getMonth() - date.getMonth();
  let days = currentDate.getDate() - date.getDate();

  if (years > 1 && months > 0) return `${years}y ago`;
  if (years > 1 && months < 0) return "a year ago";
  else if (years === 1 && months > 0) return "a year ago";
  else if (years === 1 && months < 0) return `${12 + months} months ago`;
  else if (months > 1) return `${months} months ago`;
  else if (months === 1 && days > 0) return "a month ago";
  else if (months === 1 && days < 0)
      return `${datediff(date, currentDate)} days ago`;
  else if (days > 1) return `${days} days ago`;
  else return "a day ago";
}