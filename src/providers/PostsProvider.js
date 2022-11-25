import { createContext } from "react";
import { useProvideAuth, useProvidePosts } from "../hooks";

const initialState = {
  posts: [],
  loading: true,
  addPostToState: () => {},
};

export const PostsContext = createContext(initialState);

export const PostProvider = ({ children }) => {
  const posts = useProvidePosts();

  return (
    <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
  );
};
