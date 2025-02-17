const disableLogs = () => {
  if (process.env.NODE_ENV === "production") {
    const console: any = () => ({
      log: () => {},
      info: () => {},
      warn: () => {},
      error: () => {},
    });

    window.console = console;
  }
};
export default disableLogs;
