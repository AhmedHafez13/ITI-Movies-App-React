import axios from "axios";

const MovieApi = axios.create({
  baseURL: `https://api.themoviedb.org/3`
});

MovieApi.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: '480116a6e810987d9a4c04d4ca5d4efd'
  }
  return config;
}, (error) => {
  return Promise.reject(error)
});

MovieApi.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default MovieApi;