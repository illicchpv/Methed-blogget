import { useEffect, useState } from 'react';

export const useToken = (state) => {
  const [token, setToken] = useState(state);
  // console.log('useToken = token: ', token);

  const delToken = () => {
    sessionStorage.removeItem('bearer');
    setToken('');
  };

  useEffect(() => {
    if (window.location.pathname.includes('/auth')) {
      const token = new URLSearchParams(window.location.hash.substring(1))
        .get('access_token');
      setToken(token);
    }
    if (sessionStorage.getItem('bearer')) {
      setToken(sessionStorage.getItem('bearer'));
    }
  }, []);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem('bearer', token)
    }
  }, [token]);

  return [token, delToken];
};
