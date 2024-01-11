
const appPlace = 0; // 0-local
// const appPlace = 1; // 1-github

export const URL_API = 'https://oauth.reddit.com';
export const URL_AUTH = 'https://www.reddit.com/api/v1/authorize?'; // https://github.com/reddit-archive/reddit/wiki/OAuth2
const CLIENT_ID_LOCALL = 'o3eE_EEZoM8PbDmaCLzBig'; // https://www.reddit.com/prefs/apps
const CLIENT_ID_GITHUB = 'Q5z-2GvrYbBv8gYOmMHWpQ';
export const CLIENT_ID = appPlace === 1 ? CLIENT_ID_GITHUB : CLIENT_ID_LOCALL;
export const RESPONSE_TYPE = 'token'; // https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization-implicit-grant-flow
export const RANDOM_STRING = 'random-string';
const REDIRECT_URI_LOCALL = 'http://localhost:3000/auth'; // https://www.reddit.com/prefs/apps
const REDIRECT_URI_GITHUB = 'https://illicchpv.github.io/Methed-blogget';
export const REDIRECT_URI = appPlace === 1 ? REDIRECT_URI_GITHUB : REDIRECT_URI_LOCALL;
export const SCOPE_STRING = 'identity submit read'; // https://www.reddit.com/dev/api/
// https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization-implicit-grant-flow
// Scope Values: identity, edit, flair, history, modconfig, modflair, modlog, modposts,
//    modwiki, mysubreddits, privatemessages, read, report, save, submit, subscribe, vote,
//    wikiedit, wikiread.
