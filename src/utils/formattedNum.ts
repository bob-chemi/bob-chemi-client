export const SetFormattedTwoDigitNumber = (num: number) => {
  return num.toString().padStart(2, '0');
}

export const SetFormattedDate = (dateTime: string) => {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return { year, month, day, hour, minute, second };
}