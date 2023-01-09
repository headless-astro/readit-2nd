const getLocalAccessToken = () => {
  return (
    window.localStorage.getItem("accessToken") ||
    window.sessionStorage.getItem("accessToken")
  );
};

const getLocalRefreshToken = () => {
  return (
    window.localStorage.getItem("refreshToken") ||
    window.sessionStorage.getItem("refreshToken")
  );
};

const setLocalAccessToken = (accessToken, save) => {
  if (save) {
    window.localStorage.setItem("accessToken", accessToken);
  } else {
    window.sessionStorage.setItem("accessToken", accessToken);
  }
};

const setLocalRefreshToken = (refreshToken, save) => {
  if (save) {
    window.localStorage.setItem("refreshToken", refreshToken);
  } else {
    window.sessionStorage.setItem("refreshToken", refreshToken);
  }
};

const removeLocalAccessToken = () => {
  window.localStorage.removeItem("accessToken");
  window.sessionStorage.removeItem("accessToken");
};

const removeLocalRefreshToken = () => {
  window.localStorage.removeItem("refreshToken");
  window.sessionStorage.removeItem("refreshToken");
};

const isSaved = () => {
  return window.localStorage.getItem("refreshToken") != null;
};

export default {
  getLocalAccessToken,
  getLocalRefreshToken,
  setLocalAccessToken,
  setLocalRefreshToken,
  removeLocalAccessToken,
  removeLocalRefreshToken,
  isSaved,
};
