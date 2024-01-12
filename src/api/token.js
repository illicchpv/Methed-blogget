export const setToken = (token) => {
  sessionStorage.setItem('bearer', token);
};

export const getToken = () => {
  let token = '';
  if (window.location.pathname.includes('/auth') || window.location.hash.startsWith('#access_token=')) {
    token = new URLSearchParams(window.location.hash.substring(1))
      .get('access_token');
    setToken(token);
  }
  if (sessionStorage.getItem('bearer')) {
    // setToken(sessionStorage.getItem('bearer'));
    token = sessionStorage.getItem('bearer');
  }
  return token;
};


// import {useEffect, useState} from 'react';

// export const useToken = (state) => {
//   const [token, setToken] = useState(state);
//   // console.log('useToken = token: ', token);

//   const delToken = () => {
//     sessionStorage.removeItem('bearer');
//     setToken('');
//   };

//   useEffect(() => {
//     // console.log('window.location: ', window.location);
//     // console.log('window.location.pathname: ', window.location.pathname);
//     // console.log('window.location.hash: ', window.location.hash);
//     if (window.location.pathname.includes('/auth') || window.location.hash.startsWith('#access_token=')) {
//       const token = new URLSearchParams(window.location.hash.substring(1))
//         .get('access_token');
//       setToken(token);
//     }
//     if (sessionStorage.getItem('bearer')) {
//       setToken(sessionStorage.getItem('bearer'));
//     }
//   }, []);

//   useEffect(() => {
//     if (token) {
//       sessionStorage.setItem('bearer', token);
//     }
//   }, [token]);

//   return [token, delToken];
// };
