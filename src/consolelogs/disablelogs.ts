/*  eslint "require-jsdoc": ["error", {
      "require": {
          "FunctionDeclaration": true,
          "ArrowFunctionExpression": true,
          "FunctionExpression": true
      }
}] */
/**
 * @return {void}
 */
export default function disableLogs() {
  if (process.env.REACT_APP_PRODUCTION === 'true') {
    const console: any = (function(oldCons) {
      return {
        log: () => { },
        info: () => { },
        warn: () => { },
        error: () => { },
      };
    })(window.console);
    window.console = console;
  }
};
// export default disableLogs;
