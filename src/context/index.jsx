import React from "react";

export const authContext = React.createContext({}); // ? ???warning  Fast refresh only works when a file only exports components.
export const postsContext = React.createContext({});
export const tokenContext = React.createContext({});
export const commentContext = React.createContext({});

