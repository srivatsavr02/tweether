import { eth, getInstance } from "./provider";
import Web3 from "web3";
import UserStorage from "./artifacts/UserStorage.json";
import UserController from "./artifacts/UserController.json";

export const getUserInfo = async (userId) => {
  const storage = await getInstance(UserStorage);
  const profile = await storage.profiles.call(userId);

  const { id, username, firstName, lastName, bio, gravatarEmail, profileHash } =
    profile;

  if (!parseInt(id)) throw "Couldn't find user!";

  return {
    id: parseInt(id),
    username: Web3.utils.toUtf8(username),
    firstName: Web3.utils.toUtf8(firstName),
    lastName: Web3.utils.toUtf8(lastName),
    bio,
    gravatarEmail,
    profileHash,
  };
};

export const createUser = async (
  username,
  firstName,
  lastName,
  bio,
  gravatarEmail,
  hash
) => {
  try {
    const { ethereum } = window;
    await ethereum.enable();

    const controller = await getInstance(UserController);
    const addresses = await eth.getAccounts();

    username = Web3.utils.fromAscii(username);
    firstName = Web3.utils.fromAscii(firstName);
    lastName = Web3.utils.fromAscii(lastName);

    const result = await controller.createUser(
      username,
      firstName,
      lastName,
      bio,
      gravatarEmail,
      hash,
      {
        from: addresses[0],
      }
    );

    return result;
  } catch (err) {
    return err;
  }
};

export const getLoggedInUserId = async () => {
  try {
    const { ethereum } = window;
    await ethereum.enable();
    const addresses = await eth.getAccounts();

    if (!addresses) return;

    const storage = await getInstance(UserStorage);
    const userId = await storage.addresses.call(addresses[0]);

    return parseInt(userId);
  } catch (err) {
    console.error("Err:", err);
  }
};

export const getUserIdFromUsername = async (username) => {
  const storage = await getInstance(UserStorage);
  username = Web3.utils.fromAscii(username);
  const userId = await storage.usernames.call(username);
  return parseInt(userId);
};
