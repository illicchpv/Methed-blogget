/*

authorization URL:
  https://www.reddit.com/api/v1/authorize?client_id=&response_type=&state=&redirect_uri=URI&scope=SCOPE_STRING

*/
import {
  URL_AUTH,
  CLIENT_ID,
  RESPONSE_TYPE,
  RANDOM_STRING,
  REDIRECT_URI,
  SCOPE_STRING,
} from './const.js';

const searchParams = new URLSearchParams('');

searchParams.append('client_id', CLIENT_ID);
searchParams.append('response_type', RESPONSE_TYPE);
searchParams.append('state', RANDOM_STRING);
searchParams.append('redirect_uri', REDIRECT_URI);
searchParams.append('scope', SCOPE_STRING);

export const urlAuth = `${URL_AUTH}${searchParams.toString()}`; //  внешняя ссылка авторизации
