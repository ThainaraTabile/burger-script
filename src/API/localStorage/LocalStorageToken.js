export const API_URL = process.env.REACT_APP_API_URL_BASE;

export const pegarAuthToken = () => {
  const token = localStorage.getItem('authToken');
  return token;
};

export const setAuthToken = (token, user) => {
  if (token && user) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
};
