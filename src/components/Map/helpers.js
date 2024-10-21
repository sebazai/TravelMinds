import dayjs from "dayjs";

export const  isLocationOpen = (start_timestamp, end_timestamp) => {
  const now = dayjs();

  const startTime = dayjs().hour(parseInt(start_timestamp.split(':')[0])).minute(parseInt(start_timestamp.split(':')[1]));
  const endTime = dayjs().hour(parseInt(end_timestamp.split(':')[0])).minute(parseInt(end_timestamp.split(':')[1]));

  return now.isAfter(startTime) && now.isBefore(endTime);
}