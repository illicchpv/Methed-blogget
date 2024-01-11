import React from 'react';
import PropTypes from 'prop-types';
import { usePosts } from '../hooks/usePosts';

export const postsContext = React.createContext({});
export const PostsContextProvider = ({children}) => {
  const [posts, setPosts] = usePosts();
  // console.log('posts: ', posts);
  console.log('PostsContextProvider: ', window.location.toString());

  return (
    <postsContext.Provider value={{posts, setPosts}}>
      {children}
    </postsContext.Provider>
  )
};

PostsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
