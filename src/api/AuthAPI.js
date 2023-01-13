import api from "./api";
import errors from "./errors";
import TokenService from "./TokenService";

const logout = async () => {
  try {
    //logout not implemented
    const res = await api.get(`/auth/logout`);
    TokenService.removeLocalAccessToken();
    TokenService.removeLocalRefreshToken();

    return res;
  } catch (error) {
    TokenService.removeLocalAccessToken();
    TokenService.removeLocalRefreshToken();

    return errors.errorHandler(error);
  }
};

const handleAuthResponse = (res, save) => {
  if (res.data.refresh_token && res.data.access_token) {
    TokenService.setLocalAccessToken(res.data.access_token, save);
    TokenService.setLocalRefreshToken(res.data.refresh_token, save);

    return { error: false };
  }
  return { error: res.error };
};

const login = async (username, password, save) => {
  try {
    const res = await api.post(`users/login-user`, { username, password });
    console.log(res.data);

    return handleAuthResponse(res, save);
  } catch (error) {
    return errors.errorHandler(error);
  }
};

const register = async (username, email, password) => {
  try {
    const res = await api.post(`users/register-user`, {
      username,
      email,
      password,
    });
    console.log(res.data);

    return { error: false };
  } catch (error) {
    return errors.errorHandler(error);
  }
};

export default {
  logout,
  login,
  register,
};
