// useToken
import React, { useEffect, useState } from 'react';

export const useToken = (state) => {
  const [token, setToken] = useState(state);

  useEffect(() => {
    if (window.location.pathname.includes('/auth')) {
      const token = new URLSearchParams(window.location.hash.substring(1))
        .get('access_token');
      setToken(token);
    }
    if(localStorage.getItem('bearer')){
      setToken(localStorage.getItem('bearer'));
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('bearer', token)
    }
  }, [token]);

  return [token];
};
