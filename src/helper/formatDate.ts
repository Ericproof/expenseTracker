export function formattedDate(date: Date) {
  const year: string = date.getFullYear().toString();
  const month: string = (date.getMonth() + 1).toString().padStart(2, "0");
  const day: string = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
export function getStartDate(date: Date) {
  date.setDate(date.getDate() - 7);
  // console.log(date);
  const year: string = date.getFullYear().toString();
  const month: string = (date.getMonth() + 1).toString().padStart(2, "0");
  const day: string = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
