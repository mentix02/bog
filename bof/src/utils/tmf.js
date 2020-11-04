/* Time formatting made easy */

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

function toDesiredFormat(str, short = false) {
  str = new Date(str);
  const month = months[str.getMonth()];
  str = `${str.getDate()} ${month.slice(
    0,
    short ? 3 : month.length
  )}, ${str.getFullYear()}`;
  return str;
}

export { toDesiredFormat };
