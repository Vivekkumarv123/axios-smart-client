// src/index.js
const axios = require("axios");

let config = {};
let instances = {};
let initialized = false;

function init(userConfig = {}) {
  config = {
    baseURLs: {},
    retries: 1,
    showLoading: false,
    getToken: () => null,
    onError: null,
    ...userConfig,
  };

  Object.entries(config.baseURLs).forEach(([key, baseURL]) => {
    const instance = axios.create({
      baseURL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    instance.interceptors.request.use((req) => {
      const token = config.getToken?.();
      if (token) req.headers.Authorization = `Bearer ${token}`;
      if (config.showLoading) console.log(`🔄 [${key}] ${req.method.toUpperCase()} ${req.url}`);
      return req;
    });

    instance.interceptors.response.use(
      (res) => {
        if (config.showLoading) console.log(`✅ [${key}] Success`);
        return res.data;
      },
      async (err) => {
        if (config.showLoading) console.log(`❌ [${key}] Failed`);

        const originalRequest = err.config;
        if (config.retries > 0 && !originalRequest._retry) {
          originalRequest._retry = true;
          config.retries--;
          return instances[key](originalRequest);
        }

        const normalized = {
          status: err?.response?.status || 500,
          message:
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            err.message ||
            "Unknown Error",
          isAuthError: err?.response?.status === 401,
          isNetworkError: !err?.response,
        };

        config.onError?.(normalized);
        return Promise.reject(normalized);
      }
    );

    instances[key] = instance;
  });

  initialized = true;
}

async function api(base, method, url, data = {}) {
  if (!initialized) throw new Error("axios-smart-client not initialized");

  const instance = instances[base];
  if (!instance) throw new Error(`Invalid base: ${base}`);

  method = method.toLowerCase();

  if (["get", "delete"].includes(method)) return instance[method](url);
  if (["post", "put", "patch"].includes(method)) return instance[method](url, data);
  throw new Error(`Unsupported method: ${method}`);
}

module.exports = { init, api };
