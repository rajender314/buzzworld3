/*  eslint "require-jsdoc": ["error", {
      "require": {
          "FunctionDeclaration": true,
          "ArrowFunctionExpression": true,
          "FunctionExpression": true
    }
}]  */

/**
 *
 * @param {string} query required params
 * @return {string} query
 */
export function toParams(query: string) {
  const q = query.replace(/^(\?|#)/, '');

  return q.split('&').reduce((values: object, param: string) => {
    const [key, value] = param.split('=');

    return { ...values, [key]: decodeURIComponent(value) };
  }, {});
}
/**
 * @param {any} params required params
 *  @param {string} delimiter required params
 * @return {string} query
 */
export function toQuery(params: any, delimiter = '&') {
  const keys = Object.keys(params);

  return keys.reduce((str, key, index) => {
    let query = `${str}${key}=${params[key]}`;

    if (index < keys.length - 1) {
      query += delimiter;
    }

    return query;
  }, '');
}
