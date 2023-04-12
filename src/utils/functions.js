const checkConnection = (phone, users, setConnectedUser) => {
  if (users) {
    const userConnected = users?.find((user) => user.userId === phone)
      ? true
      : false;
    setConnectedUser(userConnected);
    return userConnected;
  }
};
export { checkConnection };
