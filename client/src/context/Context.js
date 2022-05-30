import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

import { getLoggedInUserId, getUserInfo } from "../web3/users";

const INIT_STATE = {
  user: null,
  syncTweets: false,
};

export const Context = createContext(INIT_STATE);

export const ContextProvider = ({ children }) => {
  let [state, dispatch] = useReducer(Reducer, INIT_STATE);

  useEffect(() => {
    const getLogin = async () => {
      try {
        const userId = await getLoggedInUserId();
        if (userId !== 0) {
          const userInfo = await getUserInfo(userId);

          dispatch({ type: "LOGIN", payload: userInfo });

          console.log("Logged in as", userInfo);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getLogin();
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  });

  return (
    <Context.Provider value={{ ...state, dispatch }}>
      {children}
    </Context.Provider>
  );
};
