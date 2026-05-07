const getCurrentDay = () => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });

  return formattedDate;
};

export default getCurrentDay;