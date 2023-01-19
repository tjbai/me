const prettifyDate = (today: Date) => {
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const hh = String(today.getHours()).padStart(2, "0");
  const mins = String(today.getMinutes()).padStart(2, "0");
  const secs = String(today.getSeconds()).padStart(2, "0");
  return mm + "/" + dd + "/" + yyyy + " " + hh + ":" + mins + ":" + secs;
};

export { prettifyDate };
