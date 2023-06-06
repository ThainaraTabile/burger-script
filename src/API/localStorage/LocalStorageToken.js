export const API_URL = 'https://burger-queen-api-mock-mluz.vercel.app';

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