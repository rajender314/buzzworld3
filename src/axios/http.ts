import axios from 'axios';
import { token } from '@app/services/api-services';
import { removeLocalStorage } from '@app/core/localStorage/localStorage';
import EndpointUrl from '@app/core/apiEndpoints/endPoints';

const Http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    // 'Authorization': 'Bearer '
  },
  withCredentials: true,
  responseType: 'json',
});
Http.interceptors.request.use(
  (config: any) => {
    // console.log(config);
    if (config.headers && token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete Http.defaults.headers.common.Authorization;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

Http.interceptors.response.use(
  (response: any) =>
    // const statusCode = response.data.status || response.data.status_code
    // if (statusCode === 403 || statusCode === 401) {
    //  const slug = localStorage.getItem('slug')
    //  localStorage.clear()
    //  sessionStorage.clear()
    //  let redirectUrl = `/${slug}`
    //  if (process.env.REACT_APP_SUB_FOLDER) {
    //    redirectUrl = `/${process.env.REACT_APP_SUB_FOLDER}` + redirectUrl
    //  }
    //  window.location.href = redirectUrl
    // }
    response,
  (error: any) => {
    // console.log(error.response);

    if (error.response.status === 401) {
      // let redirectUrl = `/pricing`
      // if (process.env.REACT_APP_SUB_FOLDER) {
      // redirectUrl = `/${process.env.REACT_APP_SUB_FOLDER}` + redirectUrl
      // }
      window.location.href = `${process.env.REACT_APP_API_URL}`
        + `${EndpointUrl.logoutApi}?token=${token}&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
      removeLocalStorage('token');
    } else if (error.response.status === 422) {
      return error.response;
    } else if (error.response.status === 403) {
      window.location.href = `${process.env.REACT_APP_REDIRECT_URI}`.concat(
        '/access-denied',
      );
    }
    Promise.reject(error);
    return error;
  },
);
export default Http;
