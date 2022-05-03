import axios from 'src/axios/http';
import {PayloadProps} from 'src/services/schema/schema';
import {getLocalStorage} from 'src/core/localStorage/localStorage';
const apiBaseUrl = process.env.REACT_APP_API_URL;
export const token = getLocalStorage('token') as string;

/*  eslint "require-jsdoc": ["error", {
      "require": {
          "FunctionDeclaration": true,
          "ArrowFunctionExpression": true,
          "FunctionExpression": true
    }
}]  */
/**
 * @param {PayloadProps} params required params
 * @return {object} params
 */
export async function triggerApi(params: PayloadProps) {
  return getResponse(params);
}
/**
 * @param {object} params required params
 * @return {object} params
 */
async function getResponse(params: any) {
  // const bodyFormData = new FormData();
  // console.log(bodyFormData);
  // for (const key in params.payload) {
  //   bodyFormData.append(key, params.payload[key]);
  // }
  const methodTypes = ['GET', 'POST', 'PUT', 'DELETE'];

  if (!(methodTypes.indexOf(params.method.toUpperCase()) !== -1)) {
    params.method = 'GET';
  }
  try {
    const res = await axios({
      method: params.method,
      url: apiBaseUrl + params.apiUrl,
      data: params.payload,
      headers: params.headers ? params.headers : {},
    });
    // console.log(res);
    const response = res.data;
    return response;
  } catch (err) { }
}
