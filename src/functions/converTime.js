function convertTime(time24) {
  const [hours, minutes] = time24.split(":");

  const period = hours < 12 ? "ص" : "م";

  const hours12 = hours % 12 || 12;

  return `${hours12}:${minutes} ${period}`;
}

export default convertTime;
