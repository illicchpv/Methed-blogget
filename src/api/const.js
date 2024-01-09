
const isLocal = true;

export const URL_API = 'https://oauth.reddit.com';
export const URL_AUTH = 'https://www.reddit.com/api/v1/authorize?'; // https://github.com/reddit-archive/reddit/wiki/OAuth2
const CLIENT_ID_locall = 'o3eE_EEZoM8PbDmaCLzBig'; // https://www.reddit.com/prefs/apps
const CLIENT_ID_github = 'HWQT9UjBozxAmf7vr5c_yw';
export const CLIENT_ID = isLocal ? CLIENT_ID_locall : CLIENT_ID_github;
export const RESPONSE_TYPE = 'token'; // https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization-implicit-grant-flow
export const RANDOM_STRING = 'random-string';
const REDIRECT_URI_locall = 'http://localhost:3000/auth'; // https://www.reddit.com/prefs/apps
const REDIRECT_URI_github = 'https://github.com/illicchpv/Methed-blogget/auth'; // https://www.reddit.com/prefs/apps
export const REDIRECT_URI = isLocal ? REDIRECT_URI_locall : REDIRECT_URI_github;
export const SCOPE_STRING = 'identity submit read'; // https://www.reddit.com/dev/api/
// https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization-implicit-grant-flow
// Scope Values: identity, edit, flair, history, modconfig, modflair, modlog, modposts,
//    modwiki, mysubreddits, privatemessages, read, report, save, submit, subscribe, vote,
//    wikiedit, wikiread.
