export default function({ $axios, $router, redirect, store }) {

  $axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem("UserToken");
      if (token) {
        config.headers["Authorization"] = token;
        config.headers["Content-Type"] = "application/json";
      }
      return config;
    },
    error => {
      Promise.reject(error);
    }
  );

  $axios.interceptors.response.use(
    response => {
      return response;
    },
    function(error) {
      const originalRequest = error.config;

      if (error.response.status === 401 && originalRequest.url === "accounts/refresh-token/") {
        store.dispatch("clearUserData")
        return Promise.reject(error)
      }

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem("UserRefreshToken");
        return store.dispatch("refreshToken")
          .then(res => {
            $axios.defaults.headers.common[
              "Authorization"
            ] = localStorage.getItem("UserToken");
            return $axios(originalRequest);
          })
      }
      return Promise.reject(error);
    }
  );
}

