export const Login = (user) => ({
  type: "LOGIN",
  payload: user,
});

export const SyncTweets = () => ({
  type: "syncTweets",
});
