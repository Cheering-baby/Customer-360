import axios from 'axios';

const { CancelToken } = axios;
const headers = {};
headers.Authorization = 'fCm7Pc1OXg7XXWPW4DUqO3s2fa8ObSX2'; // 请求校验
headers['Content-Type'] = 'application/json';

const instance = axios.create({
  headers,
});

instance.defaults.timeout = 65000;
instance.interceptors.request.use(
  config => {
    const requestName = config.url;
    if (requestName) {
      if (instance[requestName] && instance[requestName].cancel) {
        instance[requestName].cancel();
      }

      config.cancelToken = new CancelToken(c => {
        instance[requestName] = {};
        instance[requestName].cancel = c;
      });
    }
    return config;
  },
  error => Promise.reject(error),
);

export default instance;
