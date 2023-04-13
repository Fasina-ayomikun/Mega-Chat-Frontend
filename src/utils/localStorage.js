const removeFromLocalStorage = () => {
  localStorage.removeItem("Mega-Chat-User-Info");
};

const getFromLocalStorage = () => {
  let storageUser = localStorage.getItem("Mega-Chat-User-Info");
  const user = storageUser !== "undefined" ? JSON.parse(storageUser) : null;
  return user;
};

export { removeFromLocalStorage, getFromLocalStorage };
