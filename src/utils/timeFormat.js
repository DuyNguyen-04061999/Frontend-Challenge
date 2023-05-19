export const timeFormat = (timeStamp) => {
  return new Date(timeStamp).toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
