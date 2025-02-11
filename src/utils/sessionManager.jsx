export const SessionManager = {
  getToken: () => localStorage.getItem("authToken"),
  setToken: (token) => localStorage.setItem("authToken", token),
  clearToken: () => localStorage.removeItem("authToken"),
};
