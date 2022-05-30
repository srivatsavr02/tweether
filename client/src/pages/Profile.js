import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../context/Context";
import { SyncTweets } from "../context/Actions";

import Center, { Page } from "../components/Layout";
import Avatar from "../components/Avatar";
import Web3 from "web3";

import { getUserIdFromUsername, getUserInfo } from "../web3/users";
import TweetList from "../components/TweetList";

import {
  getTweetIdsFromUser,
  getTweetInfo,
  loadTweetsFromTweetPromises,
} from "../web3/tweets";

const AVATAR_SIZE = 113;

function ProfilePage() {
  const [user, setUser] = useState({});
  const { username } = useParams();
  const { syncTweets } = useContext(Context);

  const [tweets, setTweets] = useState([]);
  const [tips, setTips] = useState(0);
  var totTips = 0;

  useEffect(() => {
    const loadUser = async () => {
      const userId = await getUserIdFromUsername(username);
      const userDetails = await getUserInfo(userId);
      setUser(userDetails);
    };

    const loadTweets = async () => {
      const tweetIds = await getTweetIdsFromUser(user.id);

      const tweetPromises = tweetIds.map((tweetId) => {
        return getTweetInfo(tweetId);
      });
      const userTweets = await loadTweetsFromTweetPromises(tweetPromises);
      setTweets(userTweets);

      totTips = 0;
      userTweets.map((tweet) => {
        totTips += tweet.tipAmount;
      });

      setTips(totTips);
    };

    loadUser();
    loadTweets();
  }, [username, user?.id, syncTweets]);

  return (
    <Page>
      <Center
        style={{
          maxWidth: 560,
          backgroundColor: "#dcdddc",
          padding: "100px",
        }}
      >
        {user && (
          <div className="profile-top">
            <div className="info">
              <h1>
                {user.firstName} {user.lastName}
              </h1>
              <h5 className="username">@{user.username}</h5>
              <h5 className="desc">{user.bio}</h5>
              <small>
                TOTAL TIPS: {Web3.utils.fromWei(tips.toString(), "Ether")} ETH
              </small>
            </div>
            <Avatar src={user.profileHash} />
            <h2>
              {user.firstName}'s tweets ({tweets.length})
            </h2>
            <TweetList tweets={tweets} />
          </div>
        )}
      </Center>

      <style jsx>{`
        .profile-top {
          margin: 40px 0;
        }
        .info {
          display: inline-block;
          width: calc(100% - ${AVATAR_SIZE}px);
          vertical-align: top;
        }
        h1 {
          font-size: 30px;
          font-weight: 500;
        }
        .username {
          font-size: 17px;
          font-weight: 400;
          margin: 7px 0;
        }
        .desc {
          font-size: 19px;
          font-weight: 400;
          margin-top: 22px;
        }

        h2 {
          font-size: 18px;
          font-weight: 600;
          margin-top: 70px;
        }
      `}</style>
    </Page>
  );
}

export default ProfilePage;
