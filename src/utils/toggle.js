export const toggle = (id, compareId, setUseState) => {
  if (id === compareId) {
    return setUseState(null);
  }
  setUseState(id);
};
