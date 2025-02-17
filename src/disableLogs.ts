/* eslint-disable no-unused-vars */
const disableLogs = () => {
  if (process.env.NODE_ENV === "production") {
    const console: any = ((oldCons) => ({
      log: () => {},
      info: () => {},
      warn: () => {},
      error: () => {},
    }))(window.console);

    window.console = console;
  }
};
export default disableLogs;
