const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "syncTweets":
      return {
        ...state,
        syncTweets: !state.syncTweets,
      };
    default:
      return state;
  }
};

export default Reducer;
