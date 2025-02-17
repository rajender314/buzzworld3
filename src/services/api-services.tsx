import axios from '@app/axios/http';
import { PayloadProps } from '@app/services/schema/schema';
import { getLocalStorage } from '@app/core/localStorage/localStorage';
// const apiBaseUrl = process.env.REACT_APP_API_URL;
export const token = getLocalStorage('token');

/*  eslint "require-jsdoc": ["error", {
      "require": {
          "FunctionDeclaration": true,
          "ArrowFunctionExpression": true,
          "FunctionExpression": true
    }
}]  */

/**
 * @param {object} params required params
 * @return {object} params
 */
async function getResponse(params: any) {
  // const bodyFormData = new FormData();
  // for (const key in params.payload) {
  //   bodyFormData.append(key, params.payload[key]);
  // }
  // params.payload['timezone']= new Date().getTimezoneOffset()
  params.headers = {
    timezoneoffset: new Date().getTimezoneOffset(),
  };
  const methodTypes = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
  console.log(params);
  if (!(methodTypes.indexOf(params.method.toUpperCase()) !== -1)) {
    params.method = 'GET';
  }
  try {
    const res = await axios({
      method: params.method,
      url: process.env.REACT_APP_API_URL + params.apiUrl,
      data: params.payload,
      headers: params.headers ? params.headers : {},
    });
    // console.log('api', res);
    // console.log('baseApi11111', apiBaseUrl);
    const response = res.data;
    return response;
  } catch (err: any) {
    console.log(err.response);
  }
  return true;
}
/**
 * @param {PayloadProps} params required params
 * @return {object} params
 */
export async function triggerApi(params: PayloadProps) {
  return getResponse(params);
}
