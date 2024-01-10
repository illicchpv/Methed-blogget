
const appPlace = 0; // 0-local
// const appPlace = 1; // 1-aclive
// const appPlace = 2; // 2-github

export const URL_API = 'https://oauth.reddit.com';
export const URL_AUTH = 'https://www.reddit.com/api/v1/authorize?'; // https://github.com/reddit-archive/reddit/wiki/OAuth2
const CLIENT_ID_locall = 'o3eE_EEZoM8PbDmaCLzBig'; // https://www.reddit.com/prefs/apps
const CLIENT_ID__aclive = 'HWQT9UjBozxAmf7vr5c_yw';
const CLIENT_ID__github = 'Q5z-2GvrYbBv8gYOmMHWpQ';
export const CLIENT_ID = appPlace === 1 ? CLIENT_ID__aclive : (appPlace === 2 ? CLIENT_ID__github : CLIENT_ID_locall);
export const RESPONSE_TYPE = 'token'; // https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization-implicit-grant-flow
export const RANDOM_STRING = 'random-string';
const REDIRECT_URI_locall = 'http://localhost:3000/auth'; // https://www.reddit.com/prefs/apps
const REDIRECT_URI__aclive = 'https://aclive.ru/methed/blogget';
const REDIRECT_URI__github = 'https://illicchpv.github.io/Methed-blogget';
export const REDIRECT_URI = appPlace === 1 ? REDIRECT_URI__aclive : (appPlace === 2 ? REDIRECT_URI__github : REDIRECT_URI_locall);
export const SCOPE_STRING = 'identity submit read'; // https://www.reddit.com/dev/api/
// https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization-implicit-grant-flow
// Scope Values: identity, edit, flair, history, modconfig, modflair, modlog, modposts,
//    modwiki, mysubreddits, privatemessages, read, report, save, submit, subscribe, vote,
//    wikiedit, wikiread.
