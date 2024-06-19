export const getRatingColor = (rating) => {
  const r = +rating;
  if (r > 8.9) return { background: "green", text: "white" };
  if (r > 7.4) return { background: "orange", text: "white" };
  if (r > 4.9) return { background: "yellow", text: "black" };
  return { background: "red", text: "white" };
};
