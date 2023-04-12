const setToLocalStorage = (user) => {
  localStorage.setItem("Mama-Recipe-user", JSON.stringify(user));
};
const removeFromLocalStorage = () => {
  localStorage.removeItem("Mama-Recipe-user");
};

const getFromLocalStorage = () => {
  let storageUser = localStorage.getItem("Mega-Chat-User-Info");
  const user = storageUser !== "undefined" ? JSON.parse(storageUser) : null;
  return user;
};

export { setToLocalStorage, removeFromLocalStorage, getFromLocalStorage };
