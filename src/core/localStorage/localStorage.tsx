export const setLocalStorage = (key: string, item: string) => {
  localStorage.setItem(key, item);
};
export const getLocalStorage = (item: string) => (localStorage.getItem(item) ? localStorage.getItem(item) : '');
// export const clearLocalStorage = () => {
//   localStorage.clear();
// };
export const removeLocalStorage = (item: string) => {
  localStorage.removeItem(item);
};
