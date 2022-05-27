import { createContext, useReducer } from "react";
import githubReducer from "./GithubRducer";

const GithubContext = createContext();

// const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // get search results
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(
      `${process.env.REACT_APP_GITHUB_URL}/search/users?${params}`,
      {
        headers: {
          authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );

    const { items } = await response.json();

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  // Set loading

  const setLoading = () => dispatch({ type: "SET_LOADING" });

  // clear Users
  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  // find user
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(
      `${process.env.REACT_APP_GITHUB_URL}/users/${login}`,
      {
        headers: {
          authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );

    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  // getRepos
  const getRepos = async () => {
    setLoading();

    const response = await fetch(
      `
      https://api.github.com/users/bradtraversy/repos
    
    `,
      {
        headers: {
          authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );

    const repos = await response.json();

    console.log("repos: ", repos);

    dispatch({
      type: "GET_REPOS",
      payload: repos,
    });
  };
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        getUser,
        clearUsers,
        getRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
