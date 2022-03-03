const getDate = (day, month, year) => {
  date = new Date(`${day}, ${month}, ${year}`)
  return date.toISOString();
}
export default getDate;